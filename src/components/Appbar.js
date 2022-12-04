import React from "react"
import {
	makeStyles,
	IconButton,
} from "@material-ui/core"
import { ExitToApp, AccountCircle } from "@material-ui/icons"
import firebase from "firebase"

const useStyles = makeStyles((theme) => ({
	title: {
		margin: "10px !important",	
	},
	sidebarInner: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		height: "100%",
	},
	links: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	link: {
		margin: "10px 0px",
		textDecoration: "none",
		color: "black",
		fontSize: "1.2rem",
	},
}))

export default function PrimaryAppBar() {
	const classes = useStyles()


	return (
		<div className={classes.sidebarInner}>
						<IconButton
							edge="end"
							aria-label="Logged In User"
							color="inherit"
							className={classes.title}
						>
							<AccountCircle />
							<div className="f3">
								{firebase.auth().currentUser
									? firebase.auth().currentUser.displayName
									: "User"}
							</div>
						</IconButton>
						<div className={classes.links}>
							<a href="/razredi" className={classes.link} >Razredi</a>
							<a href="/predmeti" className={classes.link} >Predmeti</a>
						</div>
						<IconButton
							edge="end"
							aria-label="Sign Out"
							aria-haspopup="true"
							onClick={() => {
								firebase.auth().signOut()
								console.log("signout")
							}}
							className={classes.title}
							color="inherit"
						>
							<ExitToApp />
							<div className="f5">Odjavi se</div>
						</IconButton>
		</div>
	)
}
