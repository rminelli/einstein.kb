/*
 * Schedule for updating data statistics
 * Node Schedule is a flexible cron-like and not-cron-like job scheduler for Node.js. 
 */

const schedule = require('node-schedule')

module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function () {  //  CRON jobs
        const userCount = await app.db('users').count('id').first()
        const categoriesCount = await app.db('categories').count('id').first()
        const articlesCount = await app.db('articles').count('id').first()
        const activeUserCount = await app.db('users').count('id').first().whereNull('deletedAt')        

        const { Stat } = app.api.stat

        const lastStat = await Stat.findOne({}, {}, { sort: { 'createdAt': -1 } })

        const stat = new Stat({
            users: userCount.count,
            activeUsers: activeUserCount.count,
            categories: categoriesCount.count,
            articles: articlesCount.count,
            createdAt: new Date()
        })

        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeActiveUsers = !lastStat || stat.activeUsers !== lastStat.activeUsers
        const changeCategories = !lastStat || stat.categories !== lastStat.categories
        const changeArticles = !lastStat || stat.articles !== lastStat.articles
        
        if (changeUsers || changeActiveUsers || changeCategories || changeArticles) {
            stat.save().then(() => console.log('[Stats] - Estatísticas atualizadas!'))
        }      
    })
}