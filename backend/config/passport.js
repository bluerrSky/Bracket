const LocalStrategy = require('passport-local').Strategy;
const pool = require('../db/pool');
const passport = require('passport');
const bcrypt = require('bcryptjs');

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const { rows } = await pool.query('select * from users where username=$1', [username]);
            const user = rows[0];
            if (!user) {
                return done(null, false, { message: 'User not registered!' });
            }
            const flag = await bcrypt.compare(password, user.password);
            if (!flag) {
                return done(null, false, { message: 'Invalid Password' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
    console.log('--- ATTEMPTING TO DESERIALIZE USER WITH ID:', id);
    try {
        const { rows } = await pool.query('select * from users where user_id=$1', [id]);
        const user = rows[0];
        done(null, user);
    } catch (err) {
        done(err);
    }
})

module.exports = passport;