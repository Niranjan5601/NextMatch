'use client';
import { usePathname } from "next/navigation"
import Filters from "./Filters";


export default function FiltersWrapper() {
    const pathName = usePathname();
    if(pathName === '/members') return <Filters/>
    else return null;
}
