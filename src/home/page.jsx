"use client"

import { useState } from "react"
import Header from "../home/components/header"
import SearchBar from "../home/components/searchBar"
import Footer from "../components/footer"

const Page = () => {
  const [selectedLocationId, setSelectedLocationId] = useState(null)
  const token = localStorage.getItem("token") //TOKEN DE ACESSO

  const handleLocationSelect = (locationId) => {
    setSelectedLocationId(locationId)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <SearchBar />

      {/* Hero Section Principal */}
      <section className="relative bg-gradient-to-br from-yellow-100 via-yellow-200 to-amber-200 text-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-white bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-gray-900">
                  Descubra Lugares
                  <span className="block text-amber-700">Incríveis Perto de Você</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed">
                  Conectamos você aos melhores pontos turísticos e experiências de lazer da sua região, com cupons
                  exclusivos e descontos especiais.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-700 transition-colors shadow-lg">
                  Baixar Aplicativo
                </button>
                <button className="border-2 border-amber-600 text-amber-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-600 hover:text-white transition-colors">
                  Saiba Mais
                </button>
              </div>

          
            </div>

            <div className="relative">
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-yellow-200">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Localização Inteligente</h3>
                      <p className="text-gray-600">Encontre lugares próximos automaticamente</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Cupons Exclusivos</h3>
                      <p className="text-gray-600">Descontos especiais em experiências únicas</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Avaliações Reais</h3>
                      <p className="text-gray-600">Comentários de usuários verificados</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>





      {/* Seção do Aplicativo */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Seu Companheiro de Viagem Perfeito</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nosso aplicativo móvel conecta você aos melhores pontos turísticos, experiências de lazer e ofertas
              exclusivas da sua região, tudo na palma da sua mão.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100 transition-all duration-300 border border-yellow-200">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Busca Inteligente</h3>
              <p className="text-gray-600">
                Encontre pontos turísticos, restaurantes e atividades de lazer próximos à sua localização com nossa
                busca avançada.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100 transition-all duration-300 border border-yellow-200">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ofertas Exclusivas</h3>
              <p className="text-gray-600">
                Acesse cupons de desconto e promoções especiais em parceiros locais, economizando em suas experiências
                favoritas.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100 transition-all duration-300 border border-yellow-200">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Favoritos Personalizados</h3>
              <p className="text-gray-600">
                Salve seus lugares favoritos, crie listas personalizadas e compartilhe descobertas incríveis com amigos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção do Painel Administrativo */}
      <section className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Painel Administrativo
                  <span className="block text-yellow-400">Completo e Intuitivo</span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Nossa plataforma web oferece um ambiente administrativo robusto com métricas importantes, análises
                  detalhadas e ferramentas de gestão para maximizar o potencial do seu negócio turístico.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg">Dashboard com métricas em tempo real</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg">Gestão completa de cupons e promoções</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg">Análise de avaliações e feedback</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg">Relatórios detalhados de performance</span>
                </div>
              </div>

            </div>

            <div className="relative">
              <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Dashboard Analytics</h3>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="text-2xl font-bold text-yellow-400">1,248</div>
                      <div className="text-sm text-gray-300">Total Avaliações</div>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="text-2xl font-bold text-yellow-400">4.7/5</div>
                      <div className="text-sm text-gray-300">Média Geral</div>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="text-2xl font-bold text-yellow-400">356</div>
                      <div className="text-sm text-gray-300">Cupons Ativos</div>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="text-2xl font-bold text-yellow-400">2,453</div>
                      <div className="text-sm text-gray-300">Favoritos</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Praia do Forte</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-600 rounded-full">
                          <div className="w-4/5 h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"></div>
                        </div>
                        <span className="text-yellow-400">4.8</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Museu Histórico</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-600 rounded-full">
                          <div className="w-3/5 h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"></div>
                        </div>
                        <span className="text-yellow-400">4.5</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Parque Nacional</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-600 rounded-full">
                          <div className="w-full h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"></div>
                        </div>
                        <span className="text-yellow-400">4.9</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Como Funciona o Aplicativo */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Como Funciona o Aplicativo</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Três passos simples para descobrir e aproveitar as melhores experiências da sua região
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-yellow-200 rounded-full -z-10 opacity-50"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Descubra</h3>
              <p className="text-gray-600 text-lg">
                Abra o app e veja automaticamente pontos turísticos, restaurantes e atividades próximas à sua
                localização atual.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-yellow-200 rounded-full -z-10 opacity-50"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Explore</h3>
              <p className="text-gray-600 text-lg">
                Veja fotos, leia avaliações reais de outros usuários e encontre cupons de desconto exclusivos para cada
                local.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-yellow-200 rounded-full -z-10 opacity-50"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Aproveite</h3>
              <p className="text-gray-600 text-lg">
                Use seus cupons, visite os lugares, deixe sua avaliação e salve seus favoritos para futuras aventuras.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-yellow-200 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Benefícios Exclusivos para Usuários</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Descontos de até 50% em experiências</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Notificações de ofertas próximas a você</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Sistema de pontos e recompensas</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">Listas personalizadas de favoritos</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl p-6 border border-yellow-300">
                    <div className="text-4xl font-bold text-amber-700 mb-2">Grátis</div>
                    <div className="text-gray-600 mb-4">Download e uso completamente gratuitos</div>
                    <button className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-amber-700 transition-all duration-300 shadow-lg">
                      Baixar Agora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Pronto para Começar sua Jornada?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de usuários que já descobriram lugares incríveis e economizaram com nossos cupons
            exclusivos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-yellow-600 hover:to-amber-700 transition-all duration-300 shadow-lg">
              Baixar Aplicativo Grátis
            </button>
            <button className="border-2 border-amber-500 text-amber-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-500 hover:text-white transition-all duration-300">
              Saiba Mais
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Page
