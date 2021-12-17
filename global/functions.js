const logging = (type) => {
    switch (type) {
        case 'login':
            return 'logged';
        case 'logout':
            return 'logout';
    }
}

module.exports = { logging };