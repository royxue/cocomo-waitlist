'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/app/images/logo.png'

export default function AngelUser() {
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
        body: JSON.stringify({ email, type: 'angel' }),
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
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 py-8"
      >
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <Image src={logo} alt="Ludens AI" width={200} height={100} />
            </motion.div>
          </Link>
        </div>
      </motion.header>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-effect rounded-2xl p-8 md:p-12"
          >
            <div className="text-center mb-8">
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold text-jpGray-900 mb-6"
              >
                エンジェルユーザー <br/ >
                ✨ 募集中 ✨
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-jpGray-700 mb-8 leading-relaxed"
              >
                私たちの新しい仲間として、いち早くCocomoを体験してみませんか？<br />
                ご登録いただいた方には、特別な特典をご用意しています。
              </motion.p>
            </div>

            {/* Benefits Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-10"
            >
              <h2 className="text-2xl font-bold text-jpRed-500 mb-6 text-center">
                エンジェルユーザー特典
              </h2>
              <div className="space-y-4">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-3 bg-white/50 rounded-lg p-4"
                >
                  <span className="text-jpRed-500 text-xl">✓</span>
                  <p className="text-jpGray-800">
                    最新の開発ニュースやアップデートをいち早くお届け
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-3 bg-white/50 rounded-lg p-4"
                >
                  <span className="text-jpRed-500 text-xl">✓</span>
                  <p className="text-jpGray-800">
                    先行販売版 Cocomo を <strong className="text-jpRed-500">25%OFF</strong> でご購入いただけます
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-3 bg-white/50 rounded-lg p-4"
                >
                  <span className="text-jpRed-500 text-xl">✓</span>
                  <p className="text-jpGray-800">
                    専任スタッフがご利用体験を直接ヒアリング、フィードバックを大切に反映
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-3 bg-white/50 rounded-lg p-4"
                >
                  <span className="text-jpRed-500 text-xl">✓</span>
                  <p className="text-jpGray-800">
                    あなたのアイデアが次世代 Cocomo の開発に活かされます
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-3 bg-white/50 rounded-lg p-4"
                >
                  <span className="text-jpRed-500 text-xl">✓</span>
                  <p className="text-jpGray-800">
                    正式リリース時には、新しいCocomoと無償で交換プレゼント
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mb-8"
            >
              <p className="text-lg text-jpGray-800 font-medium">
                新しい家族の仲間「Cocomo」を一緒に育てていきませんか？
              </p>
            </motion.div>

            {/* Registration Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
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
                      className="w-full bg-gradient-to-r from-jpRed-500 to-jpBlue-500 text-white font-bold py-4 px-6 rounded-xl hover:from-jpRed-600 hover:to-jpBlue-600 transition-all duration-300 pulse-glow disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
                        />
                      ) : (
                        '今すぐ登録する'
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
                      ご登録ありがとうございます！
                    </h4>
                    <p className="text-jpGray-700">
                      エンジェルユーザーとしてご登録いただきました。<br />
                      詳細情報を順次お送りいたします。
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="container mx-auto px-6 py-8 text-center"
      >
        <div className="border-t border-jpGray-200 pt-8">
          <p className="text-jpGray-600 mb-4">
            © 2025 COCOMO. すべての権利を保有します。
          </p>
        </div>
      </motion.footer>
    </main>
  )
}
