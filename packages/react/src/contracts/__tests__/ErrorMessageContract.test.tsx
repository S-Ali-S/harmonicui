// eslint-disable-next-line no-use-before-define
import React from 'react'
import { render } from '@testing-library/react'
import { createProvider } from '../../test-utils'
import { ErrorMessageContext, ErrorMessageContract } from '../ErrorMessageContract'

const {
  renderProvider,
  consumer: ErrorMessageContextConsumer,
  ConsumerComponent,
} = createProvider<ErrorMessageContract>(ErrorMessageContext, 'ErrorMessageContext')

test('throws a warning and returns default values if no provider exists to perform the contract', () => {
  console.warn = jest.fn()

  const defaults = {
    id: null,
    message: null,
    visible: false,
  }

  render(<ConsumerComponent/>)

  expect(console.warn).toHaveBeenCalledWith(
    expect.stringContaining('[ HarmonicUI: UnperformedContractWarning ]'),
  )
  expect(ErrorMessageContextConsumer).toHaveBeenReceived(defaults)
})

test('the contract defines an id property', () => {
  renderProvider({
    id: 'email-error-message',
  })

  expect(ErrorMessageContextConsumer).toHaveBeenReceived({
    id: 'email-error-message',
  })
})

test('id is null by default', () => {
  renderProvider({})

  expect(ErrorMessageContextConsumer).toHaveBeenReceived({
    id: null,
  })
})

test('the contract defines a visible property', () => {
  renderProvider({
    visible: false,
  })

  expect(ErrorMessageContextConsumer).toHaveBeenReceived({
    visible: false,
  })
})

test('visible is false by default', () => {
  renderProvider({})

  expect(ErrorMessageContextConsumer).toHaveBeenReceived({
    visible: false,
  })
})

test('the contract defines an message property', () => {
  const message = 'Whoops! something went wrong.'

  renderProvider({
    message,
  })

  expect(ErrorMessageContextConsumer).toHaveBeenReceived({
    message,
  })
})

test('message is null by default', () => {
  renderProvider({})

  expect(ErrorMessageContextConsumer).toHaveBeenReceived({
    message: null,
  })
})