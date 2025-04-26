const getLink = (path, isDemo) => isDemo ? `/demo${path}` : path

export default getLink