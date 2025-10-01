'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// Import product images
import product1 from '@/app/images/product_1.png'
import product2 from '@/app/images/product_2.png'
import product3 from '@/app/images/product_3.png'
import product4 from '@/app/images/product_4.png'
import logo from '@/app/images/logo.png'

const RobotIcon = () => (
  <motion.svg
    width="80"
    height="80"
    viewBox="0 0 100 100"
    className="text-jpRed-500"
    animate={{ rotate: [0, 5, -5, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
  >
    <motion.circle
      cx="50"
      cy="35"
      r="25"
      fill="currentColor"
      opacity="0.1"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <circle cx="50" cy="35" r="20" fill="currentColor" opacity="0.8" />
    <circle cx="42" cy="30" r="3" fill="white" />
    <circle cx="58" cy="30" r="3" fill="white" />
    <motion.path
      d="M 42 42 Q 50 48 58 42"
      stroke="white"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      animate={{ d: ["M 42 42 Q 50 48 58 42", "M 42 42 Q 50 45 58 42", "M 42 42 Q 50 48 58 42"] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <rect x="35" y="55" width="30" height="25" rx="5" fill="currentColor" opacity="0.6" />
    <circle cx="30" cy="67" r="8" fill="currentColor" opacity="0.4" />
    <circle cx="70" cy="67" r="8" fill="currentColor" opacity="0.4" />
  </motion.svg>
)

const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 3, repeat: Infinity, delay }}
  >
    {children}
  </motion.div>
)

const FloatingProductImage = ({
  src,
  alt,
  position,
  delay = 0,
  size = 120
}: {
  src: any,
  alt: string,
  position: 'left' | 'right',
  delay?: number,
  size?: number
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{
      opacity: 1,
      scale: 1,
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0]
    }}
    transition={{
      opacity: { duration: 1, delay },
      scale: { duration: 1, delay },
      y: { duration: 4, repeat: Infinity, delay },
      rotate: { duration: 6, repeat: Infinity, delay: delay + 1 }
    }}
    className={`fixed z-50 hidden lg:block ${
      position === 'left'
        ? 'left-2 xl:left-8'
        : 'right-2 xl:right-8'
    }`}
    style={{
      top: `${20 + delay * 40}%`,
    }}
  >
    <motion.div
      whileHover={{ scale: 1.1, rotate: 10 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="glass-effect rounded-2xl p-4 hover-lift"
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="object-contain"
      />
    </motion.div>
  </motion.div>
)

export default function Home() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '登録に失敗しました')
      }

      setIsSubmitted(true)
      setEmail('')
    } catch (err) {
      setError(err instanceof Error ? err.message : '登録に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Floating Product Images */}
      <FloatingProductImage
        src={product1}
        alt="COCOMO Product 1"
        position="left"
        delay={0}
        size={180}
      />
      <FloatingProductImage
        src={product2}
        alt="COCOMO Product 2"
        position="right"
        delay={0.5}
        size={200}
      />
      <FloatingProductImage
        src={product3}
        alt="COCOMO Product 3"
        position="left"
        delay={1}
        size={190}
      />
      <FloatingProductImage
        src={product4}
        alt="COCOMO Product 4"
        position="right"
        delay={1.5}
        size={210}
      />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 py-8"
      >
        <div className="flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <Image src={logo} alt="Ludens AI" width={200} height={100} />
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Product Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="lg:hidden flex justify-center"
      >
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 3, -3, 0]
          }}
          transition={{
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="glass-effect rounded-2xl p-6"
        >
          <Image
            src={product1}
            alt="COCOMO Product"
            width={220}
            height={220}
            className="object-contain"
          />
        </motion.div>
      </motion.div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-jpGray-900 mb-6 text-shadow">
              子育てを支える
              <span className="text-jpRed-500 block mt-2">新しい仲間</span>
            </h2>
            <br />
      <br />
            <br />
            <p className="text-xl md:text-2xl text-jpGray-700 mb-8 leading-relaxed">
            子どもには「考える力」や「ことばの力」を
            育むおともだちとして、<br />
            親には子育ての不安をやわらげる、<br />
            心強いサポーターとして寄り添います。<br />
            ぬいぐるみのやさしさとAIのふしぎさをあわせもつ、<br />
            新しい家族の仲間です。<br />
            </p>
          </motion.div>

          <br />
          <br />
          <br />

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-8 my-16"
          >
            <FloatingElement delay={0.1}>
              <div className="glass-effect rounded-2xl p-8 hover-lift">
                <div className="text-4xl mb-4">🤗</div>
                <h3 className="text-xl font-bold text-jpGray-800 mb-3">温かいふれあい</h3>
                <p className="text-jpGray-600">
                  自然な会話と感情豊かな表現で、家族のような絆を育みます
                </p>
              </div>
            </FloatingElement>

            <FloatingElement delay={0.2}>
              <div className="glass-effect rounded-2xl p-8 hover-lift">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-bold text-jpGray-800 mb-3">最先端のAI</h3>
                <p className="text-jpGray-600">
                  最先端のAI技術が、Cocomoをまるで本当のパートナーとしてあなたをサポートします
                </p>
              </div>
            </FloatingElement>

            <FloatingElement delay={0.3}>
              <div className="glass-effect rounded-2xl p-8 hover-lift">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="text-xl font-bold text-jpGray-800 mb-3">家族と共に成長</h3>
                <p className="text-jpGray-600">
                  家族の愛とケアを受けながら、Cocomoは一緒に成長していきます
                </p>
              </div>
            </FloatingElement>
          </motion.div>

          {/* Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-md mx-auto"
          >
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-jpGray-900 mb-4">
                最新情報をお届け
              </h3>
              <p className="text-jpGray-700 mb-6">
              メールリストに登録して、Cocomoの最新ニュースをいち早く受け取りましょう！<br />
              販売は来年の春を予定しております。
              </p>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="メールアドレスを入力"
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 bg-white/80 ${
                        error
                          ? 'border-red-300 focus:ring-red-400'
                          : 'border-jpGray-200 focus:ring-jpBlue-400'
                      }`}
                      required
                    />
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm text-center"
                      >
                        {error}
                      </motion.div>
                    )}
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-jpRed-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-jpRed-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
                        />
                      ) : (
                        '最新情報を受け取る'
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="text-6xl mb-4"
                    >
                      ✨
                    </motion.div>
                    <h4 className="text-xl font-bold text-jpGray-900 mb-2">
                      ありがとうございます！
                    </h4>
                    <p className="text-jpGray-700">
                      ご登録いただきありがとうございます。<br />
                      最新情報をお送りします。
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Angel User Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 text-center"
          >
            <Link href="/angel">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm text-jpRed-500 font-semibold py-3 px-8 rounded-xl border-2 border-jpRed-500 hover:bg-jpRed-500 hover:text-white transition-all duration-300"
              >
                <span>✨</span>
                <span>エンジェルユーザー募集中</span>
                <span>→</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 text-center"
          >
            <p className="text-jpGray-600 mb-4">すでに多くの方にご登録いただいています</p>
            <div className="flex justify-center space-x-8 text-jpGray-800">
              <div className="text-center">
                <div className="text-2xl font-bold">840+</div>
                <div className="text-sm">先行予約者</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">99%</div>
                <div className="text-sm">満足度</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">2026</div>
                <div className="text-sm">発売予定</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="container mx-auto px-6 py-8 text-center"
      >
        <div className="border-t border-jpGray-200 pt-8">
          <p className="text-jpGray-600 mb-4">
            © 2025 COCOMO. すべての権利を保有します。
          </p>
          <div className="flex justify-center space-x-6 text-jpGray-500 mb-4">
            <a href="#" className="hover:text-jpGray-700 transition-colors">プライバシーポリシー</a>
            <a href="#" className="hover:text-jpGray-700 transition-colors">利用規約</a>
            <a href="#" className="hover:text-jpGray-700 transition-colors">お問い合わせ</a>
          </div>
          <p className="text-jpGray-600">
            お問い合わせ: <a href="mailto:contact-jp@ludensai.com" className="text-jpRed-500 hover:text-jpRed-600 transition-colors">contact-jp@ludensai.com</a>
          </p>
        </div>
      </motion.footer>
    </main>
  )
}