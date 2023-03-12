import React, { useEffect, useState } from 'react'
import { createAPIEndpoint, ENDPOINTS, BASE_URL } from '../api'
import { Box, Card, CardContent, CardHeader, CardMedia, LinearProgress, List, ListItemButton, Typography } from '@mui/material'
import { getFormattedTime } from '../helper'
import { useNavigate } from 'react-router-dom'
import useStateContext from '../hooks/useStateContext'

export default function Quiz() {

  const [questions, setQuestions] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [timeTaken, setTimeTaken] = useState(0)
  const { context, setContext } = useStateContext()
  const navigate = useNavigate()

  let timer;

  const startTimer = () => {
    timer = setInterval(() => {
      setTimeTaken(prev => prev + 1) //we could have used (timeTaken + 1) here but the set function for any state object is async in nature so it might not reflect the correct value (as the previous operation might not have completed within the 1sec window)
    }, [1000])
  }

  useEffect(() => {
    //clear the context before starting a fresh quiz session
    setContext({
      timeTaken: 0,
      selectedOptions: []
    })

    createAPIEndpoint(ENDPOINTS.question)
    .fetch()
    // success callback
    .then(res => {
      setQuestions(res.data)
    })
    // failure callback
    .catch(err => { console.log(err); })
    
    startTimer()
    return () => { clearInterval(timer) } // this return call will be executed whenever we will leave this component
  }, [])

  const updateAnswer = (questionId, optionIndex) => {
    // since state objects (context here) are immutable, we cannot modify it directly, so we will destructure & copy the selectedOptions array to a temp variable & then push the updated values in array
    const temp = [...context.selectedOptions]
    temp.push({
      questionId,
      selected: optionIndex
    })

    if(questionIndex < 4) {
      setContext({ selectedOptions: [...temp] })
      setQuestionIndex(questionIndex + 1)
    }
    else {
      setContext({ selectedOptions: [...temp], timeTaken })
      navigate("/result")
    }
    
  }

  return (
    questions.length != 0
    ? <Card sx = {{ maxWidth: 640, mx: 'auto', mt: 5,
                    '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}>
        <CardHeader 
            title = { 'Question ' + (questionIndex + 1) + ' of 5' } 
            action = { <Typography>{ getFormattedTime(timeTaken) }</Typography> } />
          <Box>
            <LinearProgress variant="determinate" value={(questionIndex + 1) * 100 / 5} />
          </Box>
          { questions[questionIndex].imageName != null
                    ? <CardMedia
                        component="img"
                        image={BASE_URL + 'images/' + questions[questionIndex].imageName}
                        sx={{ width: 'auto', m: '10px auto' }} />
                    : null}
          <CardContent>
            <Typography variant='h6'>
              { questions[questionIndex].questionInWords }
            </Typography>
            <List>
              { questions[questionIndex].options.map((item, index) => 
                <ListItemButton key={index} disableRipple onClick={ () => updateAnswer(questions[questionIndex].questionId, index) }>
                  <div>
                    <b>{String.fromCharCode(65 + index) + " . "}</b>{ item }
                  </div>
                </ListItemButton>
              ) }
            </List>
          </CardContent>
    </Card>
    : null
  )
}
