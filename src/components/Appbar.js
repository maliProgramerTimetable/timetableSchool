import React from "react"
import {
	makeStyles,
	IconButton,
} from "@material-ui/core"
import { ExitToApp, AccountCircle } from "@material-ui/icons"
import firebase from "firebase"
import { strings } from "../translation/strings";

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
		color: "white",
	},
	links: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	link: {
		margin: "10px 0px",
		textDecoration: "none",
		fontSize: "1.2rem",
		color: "white",
	},
	linksInner: {
		marginTop: "30px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
}))

export default function PrimaryAppBar() {
	const classes = useStyles()


	return (
		<div className={classes.sidebarInner}>
			<div className={classes.links}>
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
						<div className={classes.linksInner}>
							<a href="/predmeti" className={classes.link} >Predmeti</a>
							<a href="/razredi" className={classes.link} >Razredi</a>
							<a href="/radni-dani" className={classes.link} >Radni dani</a>
							<a href="/raspored" className={classes.link} >Raspored</a>
						</div>
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
							<div className="f5">{strings.navbar_signout}</div>
						</IconButton>
		</div>
	)
}
