export const colorStates = (weather) => {
    switch (weather) {
        case 'Clouds':
            return {
                statusBarColor: 'rgba(66,90,98,0.83)',
                forecastBackground: '#54717a'
            }
        case 'Rain':
            return {
                statusBarColor: '#818183',
                forecastBackground: '#57575d'
            }

        case 'Sun':
            return {
                statusBarColor: '#f5d8ad',
                forecastBackground: '#47ab2f'
            }
    }

}
