import { chatbotPrompt } from '@/app/helpers/constants/chatbot-prompt';
import {
  ChatGPTMessage,
  OpenAIStream,
  OpenAIStreamPayload,
} from '@/lib/openai-steam';
import { MessageArraySchema } from '@/lib/validators/message';

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log('endpoint works!');

  const parsedMessages = MessageArraySchema.parse(messages);

  const outBoundMessages: ChatGPTMessage[] = parsedMessages.map((message) => {
    return {
      role: message.isUserMessage ? 'user' : 'system',
      content: message.text,
    };
  });

  outBoundMessages.unshift({
    role: 'system',
    content: chatbotPrompt,
  });

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: outBoundMessages,
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
    max_tokens: 150,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);

  return new Response(stream);
}
