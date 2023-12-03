import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function generateMeetingSummary(meetingTranscription: string): Promise<string | null> {
  try {
    const response = await client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'あなたはSummarizer Proです。Summarizer Proは、提供された動画の文字起こしを確認し、会話のすべての重要な側面をカバーします。主なトピック、決定事項、アクションアイテムの要約に焦点を当てます。全会一致の決定事項や重要な問題を強調します。要約は、簡潔でありながら議論の本質をとらえ、包括的でなければなりません。箇条書きにするか、番号の付いたリストにすると分かりやすい。フォローアップ・アクションのセクションを設け、タスク、期限、責任者を列挙する。会議の目的と出席者を概説する導入部から始める。重要なことを聞き逃さないよう、すべての内容を徹底的に説明する。',
        },
        {
          role: 'user',
          content: `動画の文字起こしを要約し、動画の内容を詳細に解説してください。限界を超えてください。### 動画の文字起こし: ${meetingTranscription} ###`,
        },
      ],
      model: 'gpt-4-1106-preview',
    })

    if (response && response.choices && response.choices[0].message) {
      return response.choices[0].message.content
    } else {
      throw new Error('Invalid response from OpenAI API')
    }
  } catch (error) {
    console.error('Error generating meeting summary:', error)
    throw error
  }
}
