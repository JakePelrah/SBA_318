import { useParams } from 'react-router-dom';

export default function UserView() {
    let { id } = useParams();

    return (<div>USER VIEW {id}</div>)
}