import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div style={styles.container}>
            <h1 style={styles.h1}>404.</h1>
            <p style={styles.p}>Looks like you shouldn&apos;t be here.</p>
            <Link style={styles.link} to='..'>Go Back</Link>
        </div>
    )
}

const styles = {
    container: {
        display: 'grid',
        height: '100vh',
        alignContent: 'center',
    },
    h1: {
        justifySelf: 'center',
        color: 'red',
        margin: 0,
    },
    p: {
        justifySelf: 'center',
        margin: '10px 0',
    },
    link: {
        justifySelf: 'center',
        color: 'green',
        borderBottom: '2px solid #d10fd1',
        paddingBottom: '3px',
        textDecoration: 'none',
    }
};