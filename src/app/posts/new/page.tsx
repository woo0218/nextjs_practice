'use client'

import { supabase } from '@/app/lib/supabase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewPost() {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const { data, error } = await supabase.from('posts').insert([{ title, content }]).select()

        setLoading(false)

        if (error) {
            console.error(error)
            alert('글 등록에 실패했습니다.')
        } else if (!data || data.length === 0) {
            alert('권한이 없습니다.')
        } else {
            router.push('/posts')
        }
    }

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">새 글 작성</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border p-2 rounded"
                />
                <textarea
                    placeholder="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={6}
                    className="border p-2 rounded"
                />
                <div className="flex gap-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? '등록 중...' : '등록'}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="border px-4 py-2 rounded hover:bg-gray-100"
                    >
                        취소
                    </button>
                </div>
            </form>
        </div>
    )
}
