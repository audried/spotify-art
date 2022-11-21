import {Container, Heading} from '@chakra-ui/react';
import styles from '../styles/Dash.module.css';
export default function Custom500() {
    return (
        <Container maxW={'100%'} className={styles.dash}>
            <Heading> 500 : server side error</Heading>
        </Container>
    )
    
}