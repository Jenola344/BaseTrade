import Header from "@/components/Header"
import MarketData from "@/components/MarketData"
import Portfolio from "@/components/Portfolio"
import TradingChart from "@/components/TradingChart"
import OrderForm from "@/components/OrderForm"
import AiAssistant from "@/components/AiAssistant"
import Analytics from "@/components/Analytics"

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto grid grid-cols-1 gap-4 p-4 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <div className="flex flex-col gap-4">
              <MarketData />
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="flex flex-col gap-4">
              <TradingChart />
              <OrderForm />
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="flex flex-col gap-4">
              <Portfolio />
              <Analytics />
              <AiAssistant />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
