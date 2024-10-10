import { useParams } from 'react-router-dom';

export default function CreateView() {
    let { id } = useParams();

    return (<div>CREATEA VIEW {id}</div>)
}