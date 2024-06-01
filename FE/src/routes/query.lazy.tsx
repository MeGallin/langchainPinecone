import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/query')({
  component: () => <div>Hello /query!</div>
})