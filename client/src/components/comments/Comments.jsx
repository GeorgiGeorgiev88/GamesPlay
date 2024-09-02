export default function Comments({comment,owner:{email}}) {

    return(
        <li className="comment">
        <p>{email}: {comment}</p>
        <p>{email}</p>
      </li>
    )
    
}