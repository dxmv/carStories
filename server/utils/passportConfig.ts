import { Strategy, StrategyOptions } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import passport from "passport";
import User from "../models/User";

const JwtStrategy = Strategy;
const opts: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET || "secret",
};

passport.use(
	new JwtStrategy(opts, async (jwt_payload, done) => {
		try {
			const currentUser = await User.findOne({
				where: { userId: jwt_payload.id },
			});
			// Checking if jwt user is valid
			if (currentUser) {
				const temp: any = currentUser;
				return done(null, temp.dataValues);
			}
			return done(null, false);
		} catch (e) {
			return done(e, false);
		}
	})
);
