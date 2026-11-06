import React from 'react'
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import '../css/style.css'
createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        const page = pages[`./Pages/${name}.jsx`]
        
        // Add error handling
        if (!page) {
            console.error(`Component not found: ./Pages/${name}.jsx`)
            console.log('Available pages:', Object.keys(pages))
            throw new Error(`Page component not found: ${name}`)
        }
        
        return page.default || page
    },
    
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
    
    progress: {
        color: '#4B5563',
    },
})