
import { useNavigate } from 'react-router-dom'
type Props = {
  participantsCount: string
  roundsCount: string
  participantsLength: number
  roundsLength: number
}

export default function Navbar({ 
  participantsCount,
  roundsCount,
  participantsLength,
  roundsLength
}: Props) {
  const navigate = useNavigate()

  const isRoundsDisabled = participantsLength !== Number(participantsCount) || 
    participantsLength < 2 || !roundsCount

  const isResultsDisabled = roundsLength < Number(roundsCount)

  return (
    <nav>
      <button onClick={() => navigate('/setup')}>Настройки</button>
      <button 
        onClick={() => navigate('/rounds')}
        disabled={isRoundsDisabled}
      >
        Туры
      </button>
      <button 
        onClick={() => navigate('/results')}
        disabled={isResultsDisabled}
      >
        Индивидуальные результаты
      </button>
      <button 
        onClick={() => navigate('/standings')}
        disabled={roundsLength === 0}
      >
        Положение
      </button>
      <button 
        onClick={() => navigate('/pairings')}
        disabled={roundsLength === 0}
      >
        Пары
      </button>
      <button 
        onClick={() => navigate('/overall')}
        disabled={roundsLength === 0}
      >
        Общая таблица
      </button>
    </nav>
  )
}