import React, {useState, useEffect} from 'react';
import { listClients } from './api-clients';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Person from '@material-ui/icons/Person'

export default function Clients () {
    const [clients, setClients] = useState([]);
    let controller = new AbortController();
    let signal = controller.signal

    useEffect(() => {
        listClients(signal)
            .then((data) => {
                if (data && data.error) {
                    console.log(data.error);   
                } else {
                    console.log('Data:', data);
                    setClients(data);
                }
            })
        
        return () => controller.abort();
    }, [])
    
    return (
        <List dense>
            {clients.map((client, i) => (
                <ListItem key={i}>
                    <ListItemAvatar>
                        <Avatar>
                            <Person />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={`Name: ${client.name}`}
                    />
                    <ListItemText
                        primary={`Company: ${client.company}`}
                        secondary={`Created: ${client.createdDate}`}
                    />
                </ListItem>
                ))}
        </List>
    )
}