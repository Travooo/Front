"use client"

import axios from "axios";
import { ArrowLeft, Clock, MapPin, Plus, Upload, Save, Ticket, X } from "lucide-react"
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "../components/header";
import Footer from "../components/footer";

export default function CadastrarLocal() {
  const imagemRef = useRef(null);
  const menuRef = useRef(null);

  const [imagemFile, setImagemFile] = useState(null)
  const [imagemPreview, setImagemPreview] = useState(null)

  const [menuFile, setMenuFile] = useState(null)
  const [menuPreview, setMenuPreview] = useState(null)

  const [nome, setNome] = useState('');
  const [cep, setCep] = useState('');
  const [cepValido, setCepValido] = useState(true);
  const [endereco, setEndereco] = useState('');
  const [enderecoHabilitado, setEnderecoHabilitado] = useState(false);
  const [numero, setNumero] = useState('');
  const [horarios, setHorarios] = useState('');
  const [sobre, setSobre] = useState('');
  const [tipo, setTipo] = useState('');

  const token = localStorage.getItem("token");
  const userId = parseInt(localStorage.getItem('organizacaoId'));

  const navigate = useNavigate();

  const validarFormulario = () => {
    if (!nome.trim()) return alert("O campo 'Nome' é obrigatório.") || false;
    if (!cep || cep.length !== 8 || !cepValido) return alert("Informe um CEP válido com 8 dígitos.") || false;
    if (!enderecoHabilitado || !endereco.trim()) return alert("Endereço não localizado. Verifique o CEP.") || false;
    if (!numero.trim()) return alert("O campo 'Número' do endereço é obrigatório.") || false;
    if (!horarios.trim()) return alert("Informe os horários de funcionamento.") || false;
    if (!sobre.trim()) return alert("O campo 'Sobre' é obrigatório.") || false;
    if (!tipo.trim()) return alert("Selecione um tipo de estabelecimento.") || false;
    return true;
  };

  const handleCepChange = async (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 8);
    setCep(raw);
    if (raw.length === 8) {
      const { data: dataCep } = await axios.get(`https://viacep.com.br/ws/${raw}/json/`);
      if (dataCep?.erro) {
        setCep('');
        setCepValido(false);
        setEndereco('');
        setEnderecoHabilitado(false);
        return;
      }
      setCepValido(true);
      setEndereco(`${dataCep.logradouro} - ${dataCep.bairro}`);
      setEnderecoHabilitado(true);
    } else {
      setEndereco('');
      setEnderecoHabilitado(false);
    }
  };

  const handleImagemChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagemFile(file);

    const reader = new FileReader();
    reader.onload = (event) => setImagemPreview(event.target?.result);
    reader.readAsDataURL(file);
  }

  const handleMenuChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log("Arquivo selecionado:", file);
    console.log("Tipo:", file.type);

    setMenuFile(file);

    const reader = new FileReader();
    reader.onload = (event) => setMenuPreview(event.target?.result);
    reader.readAsDataURL(file);
  }

  const getLatLng = async (address) => {
    const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`;
    const response = await axios.get(url);
    if (response.data.status === 'OK' && response.data.results.length > 0) {
      return response.data.results[0].geometry.location;
    }
    throw new Error('Endereço inválido');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    try {
      const latLng = await getLatLng(`${endereco} - ${numero}`);

      const payload = {
        usuario_organizacao_id: userId,
        nome,
        endereco: `${endereco} - ${numero}`,
        horarios,
        sobre,
        cep,
        tipo,
        lat: latLng.lat,
        lng: latLng.lng,
      };

      
      const { data: novoServico } = await axios.post(
        "http://localhost:3000/rest/v1/servicos",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const servicoId = Array.isArray(novoServico) ? novoServico[0]?.id : novoServico?.id;
      if (!servicoId) throw new Error("ID do serviço não retornado pela API.");

      if (imagemFile) {
        const formData = new FormData();
        formData.append("file", imagemFile);
        formData.append("entidade_tipo", "servicos");
        formData.append("folder", "perfil");
        formData.append("entidade_id", String(servicoId));

        try {
          const resp = await axios.post("http://localhost:3000/rest/v1/anexos", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('Upload imagemRef success:', resp.data);
        } catch (error) {
          console.error('Upload imagemRef error:', error.response?.data || error.message);
        }
      }

      if (menuFile) {
        const formData = new FormData();
        formData.append("file", menuFile);
        formData.append("entidade_tipo", "servicos");
        formData.append("folder", "docs");
        formData.append("entidade_id", String(servicoId));
        
        console.log("Enviando menu com FormData:");
        for (let pair of formData.entries()) {
          console.log(pair[0]+ ':', pair[1]);
        }
        
        try {
          const resp = await axios.post("http://localhost:3000/rest/v1/anexos", formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('Upload menuRef success:', resp.data);
        } catch (error) {
          console.error('Upload menuRef error:', error.response?.data || error.message);
        }
      }


      toast.success("Cadastro realizado com sucesso", {
        onClose: () => navigate("/meus-servicos")
      });

      setNome('');
      setCep('');
      setCepValido(true);
      setEndereco('');
      setEnderecoHabilitado(false);
      setNumero('');
      setHorarios('');
      setSobre('');
      setTipo('');
      setImagemFile(null);
      setImagemPreview(null);
      setMenuFile(null);
      setMenuPreview(null);

      if (imagemRef.current) imagemRef.current.value = "";
      if (menuRef.current) menuRef.current.value = "";

/*       toast.success("Cadastro realizado com sucesso", {
        onClose: () => navigate("/meus-servicos")
      }); */

    } catch (error) {
      console.error("Erro no cadastro:", error);
      toast.error("Erro ao cadastrar local. Verifique os dados.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      
      <Header />

      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 py-6">

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="text-gray-500 hover:text-amber-500 transition-colors"
              aria-label="Voltar"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-2xl font-bold">Cadastrar Novo Local</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden p-6 space-y-6 mb-8">

          <div>
            <label htmlFor="titulo" className="block text-base font-medium text-gray-700">
              Nome do Local
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              placeholder="Ex: Restaurante Vista Mar"
              required
              maxLength={255}
              value={nome}
              onChange={(e) => {
                const limiteVisual = 170; 
                const valor = e.target.value;
                if (valor.length <= limiteVisual) {
                  setNome(valor);
                }
              }}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-8 gap-4 items-end">
            {/* CEP */}
            <div className="col-span-1">
              <label htmlFor="cep" className="block text-base font-medium text-gray-700">CEP</label>
              <input
                id="cep"
                name="cep"
                type="text"
                placeholder={cepValido ? "00000-000" : "CEP inválido"}
                required
                minLength={8}
                maxLength={9}
                value={cep.length > 5 ? `${cep.slice(0, 5)}-${cep.slice(5)}` : cep}
                onChange={handleCepChange}
                className={`mt-1 block w-full px-3 py-2 bg-white border ${
                  cepValido ? "border-gray-300" : "border-red-500"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  cepValido ? "focus:ring-amber-500 focus:border-amber-500" : "focus:ring-red-500 focus:border-red-500"
                }`}                  
              />
            </div>
            {/* ENDEREÇO */}
            <div className="col-span-6">
              <label htmlFor="localizacao" className="block text-base font-medium text-gray-700 flex items-center gap-2">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Endereço Completo
                </span>
              </label>
              <input
                id="localizacao"
                name="endereco"
                type="text"
                placeholder="Autopreenchido pelo CEP"
                required
                value={endereco}
                minLength={3}
                maxLength={65}
                onChange={(e) => {
                  const limiteVisual = 65;
                  const valor = e.target.value;
                  if (valor.length <= limiteVisual) {
                    setEndereco(valor);
                  }
                }}
                disabled={!enderecoHabilitado}
                className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500
                  border border-gray-300
                  ${!enderecoHabilitado ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white"}
                `}                  
              />
            </div>
            {/* NÚMERO */}
            <div className="col-span-1">
              <label htmlFor="numero" className="block text-base font-medium text-gray-700">Número</label>
              <input
                id="numero"
                name="numero"
                type="text"
                placeholder="123"
                required
                value={numero}
                onChange={(e) => {
                  const limiteVisual = 12; 
                  const valor = e.target.value;
                  if (valor.length <= limiteVisual) {
                    setNumero(valor);
                  }
                }}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>
            
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            {/* CATEGORIA */}
            <div className="col-span-1">
              <label htmlFor="categoria" className="block text-base font-medium text-gray-700">Categoria</label>
              <select
                id="tipo"
                name="tipo"
                required
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="mt-1 block w-full py-[9px] px-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="">Selecione a categoria</option>
                <option value="restaurant">Restaurantes</option>
                <option value="store">Compras</option>
                <option value="park">Parques</option>
                <option value="shopping">Shoppings</option>
              </select>
            </div>
            {/* HORÁRIO */}
            <div className="col-span-1">
              <label
                htmlFor="horarios"
                className="flex text-base font-medium text-gray-700 items-center gap-2"
              >
                <Clock className="h-4 w-4" /> Horário de Funcionamento
              </label>
              <select
                id="horarios"
                name="horarios"
                value={horarios}
                onChange={(e) => setHorarios(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="">Selecione o horário</option>
                <option value="manha">Manhã (8h às 12h)</option>
                <option value="tarde">Tarde (12h às 18h)</option>
                <option value="noite">Noite (18h às 23h)</option>
                <option value="integral">Dia todo (8h às 23h)</option>
                <option value="personalizado">Personalizado</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="descricao" className="block text-base font-medium text-gray-700">Descrição</label>
            <textarea
              id="descricao"
              name="sobre"
              minLength={10}
              maxLength={475}
              placeholder="Descreva o local, suas atrações e diferenciais..."
              value={sobre}
              onChange={(e) => setSobre(e.target.value)}
              required 
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="imagem" className="flex text-base font-medium text-gray-700 items-center gap-2">
                <Upload className="h-4 w-4" /> Imagem do Local
              </label>
              <div className="mt-2 flex flex-col items-center">
                {imagemPreview ? (
                  <div className="relative w-full">
                    <img
                      src={imagemPreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 h-8 w-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      onClick={() => {
                        setImagemPreview(null);
                        setImagemFile(null);
                        if (imagemRef.current) imagemRef.current.value = "";
                      }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Clique para selecionar ou arraste a imagem</p>
                    <input
                      id="imagem"
                      ref={imagemRef}
                      name="file"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImagemChange}
                    />
                    <button
                      type="button"
                      className="mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2"
                      onClick={() => imagemRef.current?.click()}
                    >
                      <Plus className="h-4 w-4" />
                      Selecionar Imagem
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="menu" className="flex text-base font-medium text-gray-700 items-center gap-2">
                <Upload className="h-4 w-4" /> Anexar Cardápio (PDF)
              </label>
              <div className="mt-2 flex flex-col items-center">
                {menuPreview ? (
                  <div className="relative w-full">
                    <div className="w-full h-48 bg-gray-100 rounded-md border flex items-center justify-center">
                      <p className="text-sm text-gray-700">Arquivo selecionado</p>
                    </div>
                    <button
                      type="button"
                      className="absolute top-2 right-2 h-8 w-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      onClick={() => {
                        setMenuPreview(null);
                        setMenuFile(null);
                        if (menuRef.current) menuRef.current.value = "";
                      }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Clique para selecionar ou arraste o cardápio (PDF)</p>
                    <input id="menu" ref={menuRef} type="file" name="file" accept=".pdf" className="hidden" onChange={handleMenuChange} />
                    <button
                      type="button"
                      className="mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2"
                      onClick={() => menuRef.current?.click()}
                    >
                      <Plus className="h-4 w-4" />
                      Selecionar Cardápio
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            {/*COMENTEI BOTÃO DE CUPONS*/}
            
            {/*
            <div className="flex-1">
              <label htmlFor="cupom" className="block text-base font-medium text-gray-700 flex items-center gap-2">
                <Ticket className="h-4 w-4" /> Atribuir Cupom
              </label>
              <div className="flex items-center mt-1">
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    id="cupom"
                    checked={cupomAtivo}
                    onChange={() => setCupomAtivo(!cupomAtivo)}
                    className="opacity-0 absolute h-0 w-0"
                  />
                  <div className="bg-gray-200 rounded-full h-6 w-11 cursor-pointer flex items-center">
                    <div
                      className={`transform duration-200 ease-in-out h-5 w-5 rounded-full shadow-md ${
                        cupomAtivo ? "translate-x-6 bg-amber-500" : "translate-x-1 bg-white"
                      }`}
                    ></div>
                  </div>
                </div>
                <span className="ml-2 text-sm text-gray-600">{cupomAtivo ? "Cupom ativo" : "Sem cupom"}</span>
                {cupomAtivo && (
                  <button
                    type="button"
                    className="ml-4 px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    onClick={handleCupomClick}
                  >
                  Configurar Cupom
                  </button>
                )}
              </div>
            </div>
            */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 rounded-md transition-colors text-sm font-medium"
                onClick={() => window.history.back()}
              >
              Cancelar
              </button>
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors text-sm font-medium"
              >
                <Save className="h-4 w-4" /> Cadastrar Local
              </button>
            </div>
          </div>
        </form>
      </main>
      <ToastContainer 
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Footer />
    </div>
  );
}
