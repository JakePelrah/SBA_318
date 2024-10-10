import { useParams } from 'react-router-dom';

export default function PostView() {
    let { id } = useParams();

    return (<div>PIOST VIEW {id}</div>)
}