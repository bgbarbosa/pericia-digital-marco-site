import Image from "next/image";

export default function CredentialsAffiliations({ profile }) {
  return (
    <div className="credential-memberships">
      <div className="credential-memberships-grid">
        <div className="credential-membership" data-testid="apecof-membership">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border border-white/10 bg-slate-950 sm:h-36 sm:w-36 xl:h-40 xl:w-40">
            <Image
              src={profile.association.image}
              alt={`Logotipo da ${profile.association.acronym}`}
              fill
              className="object-contain p-3"
              sizes="160px"
            />
          </div>
          <h4 className="mt-4 text-xl font-semibold text-white">
            {profile.association.acronym}
          </h4>
          <p>{profile.association.statement}</p>
        </div>
        <div className="credential-membership" data-testid="ai-brasil-membership">
          <div className="relative h-32 w-full max-w-64 sm:h-36 xl:h-40">
            <Image
              src={profile.community.image}
              alt="Identidade visual da comunidade AI Brasil"
              fill
              className="object-contain"
              sizes="256px"
            />
          </div>
          <h4 className="mt-4 text-xl font-semibold text-white">
            {profile.community.title}
          </h4>
          <p>{profile.community.statement}</p>
        </div>
      </div>
    </div>
  );
}
