import { createContext, useState } from "react"

const ThemeContext = createContext()

function ThemeProviderWrapper(props) {

    const [themeValue, setThemeValue] = useState('light')
    const [isLigthMode, setIsLigthMode] = useState(true)

    const switchTheme = () => {
        if (themeValue === 'dark') setThemeValue('light')
        if (themeValue === 'light') setThemeValue('dark')
        isLigthMode === true ? setIsLigthMode(false) : setIsLigthMode(true)
    }

    return (
        <ThemeContext.Provider value={{ themeValue, switchTheme, isLigthMode }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProviderWrapper }