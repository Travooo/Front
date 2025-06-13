"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import Header from "../components/header"
import Footer from "../components/footer"
import { SummaryCard } from "./components/summaryCard"
import { DashboardIcons } from "./components/icons"
import UserProfile from "./components/userProfile"

function DashboardAdmin() {
  const [dashboardData, setDashboardData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState({
    name: "Carregando...",
    image: "/imagens/pessoa.jpg",
  })

  const { StarIcon, TicketIcon, BookmarkIcon } = DashboardIcons

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        const token = localStorage.getItem("token")
        const organizacaoId = localStorage.getItem("organizacaoId")

        if (!token || !organizacaoId) {
          console.error("Token ou ID da organização não encontrado")
          setIsLoading(false)
          return
        }

        // 🔧 CORREÇÃO 1: Buscar dados da organização corretamente
        try {
          const userResponse = await fetch(`http://localhost:3000/rest/v1/usuariosOrg/${organizacaoId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })

          if (userResponse.ok) {
            const orgData = await userResponse.json()
            console.log("Dados da organização:", orgData) // Para debug

            // Ajustar conforme a estrutura real da sua API
            let orgName = "Organização"
            if (Array.isArray(orgData) && orgData.length > 0) {
              orgName = orgData[0].nome_fantasia || orgData[0].nome || "Organizaç��o"
            } else if (orgData && typeof orgData === "object") {
              orgName = orgData.nome_fantasia || orgData.nome || "Organização"
            }

            setUserData({
              name: orgName,
              image: "/imagens/pessoa.jpg",
            })
          } else {
            console.error("Erro ao buscar dados da organização:", await userResponse.json())
          }
        } catch (orgError) {
          console.error("Erro na requisição da organização:", orgError)
        }

        // Buscar notificações
        const response = await fetch("http://localhost:3000/rest/v1/notificacoes", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          const errorData = await response.json()
          console.error("Erro ao buscar notificações:", errorData)
          setIsLoading(false)
          return
        }

        const notificacoes = await response.json()

        const recentNotifications = notificacoes.slice(0, 5).map((n) => ({
          id: n.id,
          title: n.titulo,
          message: n.descricao,
          date: n.created_at,
          read: false,
        }))

        // 🔧 CORREÇÃO 2: Buscar avaliações com join correto para serviços
        const avalResponse = await fetch(
          "http://localhost:3000/rest/v1/avaliacao?select=*,servicos:servico_id(id,nome,localizacao)",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (!avalResponse.ok) {
          console.error("Erro ao buscar avaliações:", await avalResponse.json())
          setIsLoading(false)
          return
        }

        const avaliacoes = await avalResponse.json()
        console.log("Avaliações com serviços:", avaliacoes) // Para debug

        const totalReviews = avaliacoes.length

        const averageRating =
          totalReviews > 0 ? (avaliacoes.reduce((sum, a) => sum + a.numero_estrelas, 0) / totalReviews).toFixed(1) : 0

        // 🔧 CORREÇÃO 3: Melhorar o agrupamento por serviço/localização
        const serviceRatingsMap = {}
        avaliacoes.forEach((a) => {
          // Verificar diferentes possibilidades de estrutura da resposta
          let serviceName = "Serviço Desconhecido"

          if (a.servicos) {
            // Se servicos é um objeto
            if (typeof a.servicos === "object" && !Array.isArray(a.servicos)) {
              serviceName = a.servicos.nome || `Serviço ${a.servicos.id}` || "Serviço Desconhecido"
            }
            // Se servicos é um array
            else if (Array.isArray(a.servicos) && a.servicos.length > 0) {
              serviceName = a.servicos[0].nome || `Serviço ${a.servicos[0].id}` || "Serviço Desconhecido"
            }
          }

          // Fallback: tentar buscar pelo servico_id diretamente
          if (serviceName === "Serviço Desconhecido" && a.servico_id) {
            serviceName = `Serviço ${a.servico_id}`
          }

          if (!serviceRatingsMap[serviceName]) {
            serviceRatingsMap[serviceName] = { total: 0, count: 0 }
          }
          serviceRatingsMap[serviceName].total += a.numero_estrelas
          serviceRatingsMap[serviceName].count += 1
        })

        // 🔧 CORREÇÃO 4: Garantir que cada serviço tenha sua própria coluna
        const serviceRatings = Object.entries(serviceRatingsMap)
          .map(([name, stats]) => ({
            name: name.length > 15 ? name.substring(0, 15) + "..." : name, // Truncar nomes muito longos
            rating: Number((stats.total / stats.count).toFixed(1)),
            fullName: name, // Manter nome completo para tooltip
          }))
          .sort((a, b) => b.rating - a.rating) // Ordenar por rating decrescente

        console.log("Service ratings processados:", serviceRatings) // Para debug

        // Últimas avaliações com correção similar
        const latestReviews = avaliacoes
          .sort((a, b) => new Date(b.data_comentario) - new Date(a.data_comentario))
          .slice(0, 3)
          .map((a) => {
            let serviceName = "Serviço Desconhecido"

            if (a.servicos) {
              if (typeof a.servicos === "object" && !Array.isArray(a.servicos)) {
                serviceName = a.servicos.nome || `Serviço ${a.servicos.id}` || "Serviço Desconhecido"
              } else if (Array.isArray(a.servicos) && a.servicos.length > 0) {
                serviceName = a.servicos[0].nome || `Serviço ${a.servicos[0].id}` || "Serviço Desconhecido"
              }
            }

            if (serviceName === "Serviço Desconhecido" && a.servico_id) {
              serviceName = `Serviço ${a.servico_id}`
            }

            return {
              id: a.id,
              serviceName,
              rating: a.numero_estrelas,
              comment: a.comentario,
              date: a.data_comentario,
            }
          })

        const cuponsResponse = await fetch("http://localhost:3000/rest/v1/cupons", {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!cuponsResponse.ok) {
          console.error("Erro ao buscar cupons:", await cuponsResponse.json())
          setIsLoading(false)
          return
        }

        const cupons = await cuponsResponse.json()
        const totalCoupons = cupons.length

        const data = {
          totalReviews,
          averageRating,
          totalCoupons,
          redeemedCoupons: 1,
          totalFavorites: 10,
          serviceRatings,
          latestReviews,
          recentNotifications,
        }

        setDashboardData(data)
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-black rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">Carregando dados...</p>
        </div>
      </div>
    )
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("pt-BR", options)
  }

  // 🔧 CORREÇÃO 5: Tooltip customizado para mostrar nome completo
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-medium">{data.fullName || label}</p>
          <p className="text-yellow-600">Avaliação: {payload[0].value}/5</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="h-16 bg-white shadow-sm mb-6">
        <Header />
      </div>

      <div className="container mx-auto px-4">
        <UserProfile name={userData.name} image={userData.image} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          <SummaryCard
            title="Total de Avaliações"
            value={dashboardData.totalReviews}
            icon={<StarIcon className="w-10 h-10 text-yellow-500" />}
          />
          <SummaryCard
            title="Média de Avaliação"
            value={`${dashboardData.averageRating}/5`}
            icon={<StarIcon className="w-10 h-10 text-yellow-500" />}
          />
          <SummaryCard
            title="Total de Cupons"
            value={dashboardData.totalCoupons}
            icon={<TicketIcon className="w-10 h-10 text-yellow-500" />}
          />
          <SummaryCard
            title="Cupons Resgatados"
            value={dashboardData.redeemedCoupons}
            icon={<TicketIcon className="w-10 h-10 text-yellow-500" />}
          />
          <SummaryCard
            title="Total de Favoritos"
            value={dashboardData.totalFavorites}
            icon={<BookmarkIcon className="w-10 h-10 text-yellow-500" />}
          />
        </div>

        <div className="mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Média de Avaliação por Serviço</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboardData.serviceRatings} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} />
                  <YAxis domain={[0, 5]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="rating" fill="#FFC107" name="Avaliação Média" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Últimas Avaliações</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {dashboardData.latestReviews.slice(0, 3).map((review) => (
                <div key={review.id} className="p-6">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-gray-800">{review.serviceName}</h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{review.comment}</p>
                  <div className="text-sm text-gray-500 mt-3">{formatDate(review.date)}</div>
                </div>
              ))}

            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">Notificações Recentes</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {dashboardData.recentNotifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className={`p-6 ${!notification.read ? "bg-yellow-50" : ""}`}>
                  <div className="flex items-start">
                    <div
                      className={`w-3 h-3 mt-2 rounded-full ${!notification.read ? "bg-yellow-500" : "bg-gray-300"}`}
                    ></div>
                    <div className="ml-4 flex-1">
                      <h4 className="font-medium text-gray-800">{notification.title}</h4>
                      <p className="text-gray-600 mt-2">{notification.message}</p>
                      <div className="text-sm text-gray-500 mt-3">{formatDate(notification.date)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default DashboardAdmin
