export default async function Profile({params}:{params:Promise<{profile:number}>})
{
    const profile_id=(await params).profile;

    return(
        <div>
            Profile of: {profile_id};
        </div>
    )
}