// import OpenAI from 'openai';  <-이거 대신 아래줄 추가했음
const OpenAI = require('openai');
var cors = require('cors')
const openai = new OpenAI({
  apiKey: "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", // This is the default and can be omitted
});

const express = require('express')
const app = express()
app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing 

// app.get('/', async function (req, res) {
//   res.send('Hello World')
// })

// POST method route
app.post('/fortuneTell', async function(req, res) {
    const Completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: '당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다. 당신의 이름은 챗도지입니다.' },
        {role: 'user', content:'오늘의 운세가 뭐야?'}
        
    ],
      });
     
    //   console.log(Completion.choices[0]); 
    
    let forturn = Completion.choices[0].message['content'];  //챗gpt의 답변 텍스트만 가져오고 싶다면

    console.log(forturn);
    res.json({"assistant":forturn});

})
app.listen(3000)