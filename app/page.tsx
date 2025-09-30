'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const RobotIcon = () => (
  <motion.svg
    width="80"
    height="80"
    viewBox="0 0 100 100"
    className="text-warm-600"
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
    <main className="min-h-screen gradient-bg">
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
            <RobotIcon />
            <h1 className="text-3xl font-bold text-warm-800 tracking-wide">
              COCOMO
            </h1>
          </motion.div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-warm-900 mb-6 text-shadow">
              あなたの新しい
              <span className="text-cherry-500 block mt-2">家族</span>
            </h2>
            <p className="text-xl md:text-2xl text-warm-700 mb-8 leading-relaxed">
              COCOMOは、あなたの日常に寄り添う<br />
              次世代コンパニオンロボットです
            </p>
          </motion.div>

          {/* Robot Illustration Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="my-16"
          >
            <FloatingElement>
              <div className="w-64 h-64 mx-auto warm-gradient rounded-full flex items-center justify-center glass-effect">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <RobotIcon />
                </motion.div>
              </div>
            </FloatingElement>
          </motion.div>

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
                <h3 className="text-xl font-bold text-warm-800 mb-3">温かいふれあい</h3>
                <p className="text-warm-600">
                  自然な会話と感情豊かな表現で、家族のような絆を育みます
                </p>
              </div>
            </FloatingElement>

            <FloatingElement delay={0.2}>
              <div className="glass-effect rounded-2xl p-8 hover-lift">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-bold text-warm-800 mb-3">学習する AI</h3>
                <p className="text-warm-600">
                  あなたの好みや習慣を学習し、より良いサポートを提供します
                </p>
              </div>
            </FloatingElement>

            <FloatingElement delay={0.3}>
              <div className="glass-effect rounded-2xl p-8 hover-lift">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="text-xl font-bold text-warm-800 mb-3">生活サポート</h3>
                <p className="text-warm-600">
                  日常のタスクから健康管理まで、幅広くサポートします
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
              <h3 className="text-2xl font-bold text-warm-900 mb-4">
                先行予約受付中
              </h3>
              <p className="text-warm-700 mb-6">
                COCOMOの発売をいち早くお知らせします
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
                          : 'border-warm-200 focus:ring-warm-400'
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
                      className="w-full bg-gradient-to-r from-warm-500 to-cherry-500 text-white font-bold py-3 px-6 rounded-xl hover:from-warm-600 hover:to-cherry-600 transition-all duration-300 pulse-glow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
                        />
                      ) : (
                        '先行予約に申し込む'
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
                    <h4 className="text-xl font-bold text-warm-900 mb-2">
                      ありがとうございます！
                    </h4>
                    <p className="text-warm-700">
                      先行予約を受け付けました。<br />
                      発売情報をお送りします。
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 text-center"
          >
            <p className="text-warm-600 mb-4">すでに多くの方にご登録いただいています</p>
            <div className="flex justify-center space-x-8 text-warm-800">
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
        <div className="border-t border-warm-200 pt-8">
          <p className="text-warm-600 mb-4">
            © 2025 COCOMO. すべての権利を保有します。
          </p>
          <div className="flex justify-center space-x-6 text-warm-500">
            <a href="#" className="hover:text-warm-700 transition-colors">プライバシーポリシー</a>
            <a href="#" className="hover:text-warm-700 transition-colors">利用規約</a>
            <a href="#" className="hover:text-warm-700 transition-colors">お問い合わせ</a>
          </div>
        </div>
      </motion.footer>
    </main>
  )
}