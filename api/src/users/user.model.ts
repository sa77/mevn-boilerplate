import mongoose, { Schema, Document } from 'mongoose';
import * as bcrypt from "bcryptjs"
import * as yup from "yup";

export const emailValidationSchema = yup.object({
	email: yup.string().email().required(),
});

export interface UserModel {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface UserBaseDocument extends UserModel, Document {
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
	return bcrypt.compareSync(password, this.password);
};

// --- hooks
UserSchema.pre<UserBaseDocument>('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 8);
	}
	next();
});

// export
export default mongoose.model<UserBaseDocument>('User', UserSchema);
