import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createAPIEndpoint, ENDPOINTS } from '../api'
import useStateContext from '../hooks/useStateContext'
import { getFormattedTime } from '../helper'
import { Alert, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system'
import { green } from '@mui/material/colors';
import Answer from './Answer'

export default function Result() {

  const {context, setContext} = useStateContext()
  const [score, setScore] = useState(0)
  const [qnAnswers, setQnAnswers] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const ids = context.selectedOptions.map(q => q.questionId)
    createAPIEndpoint(ENDPOINTS.getAnswers)
    .post(ids)
    // res (mapped by y) contains the correct answers fetched from the DB, and selectedOptions (mapped by x) contains the answers selected by player
    // qna contains the merged record of each question and it contains the correct answer as well asa the answer selected by player
    .then(res => {
      const qna = context.selectedOptions
          .map(x => ({
            ...x,
            ...(res.data.find(y => y.questionId == x.questionId))
          }))
        
      setQnAnswers(qna)
      calculateScore(qna)
    })
    .catch(err => console.log(err))
  }, [])

  const calculateScore = qna => {
    let tempScore = qna.reduce((acc, current) => {
      return current.answer == current.selected ? acc + 1 : acc;
    }, 0)

    setScore(tempScore)
  }

  const restart = () => {
    setContext({
      timeTaken: 0,
      selectedOptions: []
    })

    navigate("/quiz")
  }

  const submitScore = () => {
    createAPIEndpoint(ENDPOINTS.participant)
      .put(context.participantId, {
        participantId: context.participantId,
        score: score,
        timeTaken: context.timeTaken
      })
      .then(res => {
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 4000); // we will show this alert for only 4 seconds and then it will disappear
      })
      .catch(err => { console.log(err) })
  }

  return (
    <>
      <Card sx={{ mt: 5, display: 'flex', width: '100%', maxWidth: 640, mx: 'auto' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
            <Typography variant="h4">Congratulations!</Typography>
            <Typography variant="h6">
              YOUR SCORE
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              <Typography variant="span" color={green[500]}>
                {score}
              </Typography>/5
            </Typography>
            <Typography variant="h6">
              Took {getFormattedTime(context.timeTaken) + ' mins'}
            </Typography>
            <Button variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={submitScore}>
              Submit
            </Button>
            <Button variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={restart}>
              Re-try
            </Button>
            <Alert
              severity="success"
              variant="string"
              sx={{
                width: '60%',
                m: 'auto',
                visibility: showAlert ? 'visible' : 'hidden'
              }}>
              Score Updated.
            </Alert>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 220 }}
          image="./result.png"
        />
      </Card>
      <Answer qnAnswers={qnAnswers} />
    </>
  )
}
