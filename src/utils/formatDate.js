const formatDate = d => {
    const year = new Date(d).getFullYear()
    let month = new Date(d).getMonth() + 1
    let day = new Date(d).getDate()
    if (month < 10) { month = `0${month}` }
    if (day < 10) { day = `0${day}` }
    return `${year}-${month}-${day}`
}

export default formatDate