import '../App.css';

export default function Display({curr, pre}) {
return(
<div className='bg-black text-6xl text-white text-right rounded-t-md pt-5'>
        {curr || pre}
</div>
)
};