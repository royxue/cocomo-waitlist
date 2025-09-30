import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existingEntry } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email.toLowerCase())
      .single()

    if (existingEntry) {
      return NextResponse.json(
        { error: 'このメールアドレスは既に登録されています' },
        { status: 409 }
      )
    }

    // Insert new email
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          email: email.toLowerCase(),
          source: 'landing_page',
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: '登録に失敗しました。もう一度お試しください。' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: '登録が完了しました！', data },
      { status: 201 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: '予期しないエラーが発生しました' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { data, error, count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'データの取得に失敗しました' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      count,
      data: data?.map(entry => ({
        id: entry.id,
        email: entry.email,
        created_at: entry.created_at,
        source: entry.source
      }))
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: '予期しないエラーが発生しました' },
      { status: 500 }
    )
  }
}