import Link from "next/link";
interface TextProps{
    text:string,
    href:string,
    label:string
}
 function Text({text,href,label}:TextProps){
    return <p className="text-center text-sm  text-gray-500 hover:text-gray-900 ">
        {text} <Link className="underline" href={href}>{label}</Link>    
    </p>
}

export {Text}