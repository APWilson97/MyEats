import React from 'react'
import classes from './registerPage.module.css'
import { useForm } from 'react-hook-form'
import Input from '../../../components/Input/Input'
import Title from '../../../components/Title/Title'
import Button from '../../../components/Button/Button'
import { Link } from 'react-router-dom'

export default function RegisterPage() {
  const {
    handleSubmit,
    register, 
    getValues,
    formState: { errors }
  } = useForm()

  const submit = async (data) => {}

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Create your MyEats account" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input type="text" label="Name" {...register('name', {
            required: true,
          })}
          error={errors.name} />

          <Input type='email' label='Email' {...register('email', {
            required: true,
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
              message: 'Email is not valid'
            }
          })}
          error={errors.email} />

          <Input type='password' label='Password' {...register('password', {
            required: true,
            minLength: 5
          })}
          error={errors.password} />

          <Input type='password' label='Confirm Password' {...register('confirmPassword', {
            required: true,
            validate: value => value !== getValues('password') ? 'Passwords do not match' : true
          })}
          error={errors.confirmPassword} />

          <Input type='text' label='Address' {...register('address', {
            required: true,
            minLength: 10
          })}
          error={errors.address} />

          <Button type='submit' text='Sign up' />
        </form>
      </div>
    </div>
  )
}
