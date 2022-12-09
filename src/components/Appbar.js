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
		color: "rgba(0, 0, 0, 0.8)",
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
		color: "rgba(0, 0, 0, 0.5)",
	},
	linksInner: {
		marginTop: "30px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	active: {
		color: "rgba(0, 0, 0, 0.8)",
	},
}))

export default function PrimaryAppBar({predmeti, razredi, radniDani, raspored}) {
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
							<a href="/predmeti" className={`${classes.link} ${predmeti ? classes.active : ""}`} >Predmeti</a>
							<a href="/razredi" className={`${classes.link} ${razredi ? classes.active : ""}`} >Razredi</a>
							<a href="/radni-dani" className={`${classes.link} ${radniDani ? classes.active : ""}`} >Radni dani</a>
							<a href="/" className={`${classes.link} ${raspored ? classes.active : ""}`} >Raspored</a>
						</div>
						</div>
						<IconButton
							edge="end"
							aria-label="Sign Out"
							aria-haspopup="true"
							onClick={() => {
								firebase.auth().signOut()
								localStorage.removeItem("uid")
								window.location.href = "/login"
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
