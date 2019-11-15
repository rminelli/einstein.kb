module.exports = app => {
    const Stat = app.mongoose.model('Stat', {
        users: Number,
        activeUsers: Number,        
        categories: Number,
        articles: Number,
        createdAt: Date
    })

    const get = (req, res) => {
        Stat.findOne({}, {}, { sort: { 'createdAt' : -1 } })
            .then(stat => {
                const defaultStat = {
                    users: 'default value - check schedule',
                    activeUsers: 'default value',
                    categories: 'default value',
                    articles: 'default value'
                }
                res.json(stat || defaultStat)
            })
    }

    return { Stat, get }
}