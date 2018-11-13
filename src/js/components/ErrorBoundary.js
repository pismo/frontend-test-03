// @flow
import React, { Component } from 'react'

type Props = {
    children: any
}

class ErrorBoundary extends Component<Props> {
    constructor (props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError () {
        return { hasError: true }
    }

    componentDidCatch (error, info) {
        console.log(error, info)
    }

    render () {
        if (this.state.hasError) {
            return <h1>Erro no Servidor.</h1>
        }

        return this.props.children
    }
}

export default ErrorBoundary
