
import { PRIVATE_GOOGLE_NODEMAILER_PASSWORD } from "$env/static/private"
import nodemailer, { type Transporter } from "nodemailer"

export default class EMailer {

	private from: string
	private fromEmail: string
	private transport: Transporter

	constructor() {
		this.from = "Kiwi's Meal Generator"
		this.fromEmail = "kiwi.mealgenerator@gmail.com"
		this.transport = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "kiwi.mealgenerator@gmail.com",
				pass: PRIVATE_GOOGLE_NODEMAILER_PASSWORD
			}
		})
	}

	private async send(to: string, subject: string, html: string) {

		// email sender shows up as email.from, and uses email.fromEmail as the sender email
		return await this.transport.sendMail({
			from: `${this.from} <${this.fromEmail}>`,
			to,
			subject,
			html
		})

	}

	public async sendConfirmationEmail(to: string, link: string) {
		await this.send(to, "Confirm your email", `
			<h1>Kiwi's Meal Generator</h1>
			<button>
				<a href="${link}">Confirm your email</a>
			</button>
		`)
	}

	public async sendResetPasswordEmail(to: string, link: string) {
		await this.send(to, "Reset your password", `
			<h1>Kiwi's Meal Generator</h1>
			<button>
				<a href="${link}">Reset your password</a>
			</button>
		`)
	}

}