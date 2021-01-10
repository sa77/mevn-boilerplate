import mongoose, { Schema, Document } from 'mongoose';
import * as bcrypt from "bcryptjs"
import * as yup from "yup";

export const emailValidationSchema = yup.object({
	email: yup.string().email().required(),
});

export interface User {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

interface UserBaseDocument extends User, Document {
	fullName: string;
	checkPassword: (password: string) => Promise<boolean>
}

const UserSchema: Schema<UserBaseDocument> = new Schema({
	firstName: { type: String, required: false },
	lastName: { type: String, required: false },
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		validate(value: string) {
			if (!emailValidationSchema.isValidSync({ email: value })) {
				throw new Error('Invalid email');
			}
		},
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 8,
		validate(value: string) {
			if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
				throw new Error('Password must contain at least one letter and one number');
			}
		},
		private: true
	},
},
	{
		timestamps: true,
	});

// --- virtuals
UserSchema.virtual("fullName").get(function (this: UserBaseDocument) {
	return this.firstName + this.lastName
})


// --- methods
UserSchema.methods.checkPassword = async function (password: string) {
	const user = this;
	return bcrypt.compareSync(password, user.password);
};

// --- hooks
UserSchema.pre<UserBaseDocument>('save', async function (next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

// export
export default mongoose.model<UserBaseDocument>('UserSchema', UserSchema);
