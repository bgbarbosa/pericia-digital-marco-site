import Image from "next/image";

export default function CredentialsAffiliations({ profile }) {
  return (
    <div className="credential-memberships" role="group" aria-label="Associações e comunidades">
      <div className="credential-memberships-grid">
        <div className="credential-membership" data-testid="apecof-membership">
          <div className="credential-logo credential-logo-association relative overflow-hidden rounded-full border border-white/10 bg-slate-950">
            <Image
              src={profile.association.image}
              alt={`Logotipo da ${profile.association.acronym}`}
              fill
              className="object-contain p-3"
              sizes="160px"
            />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-white">
            {profile.association.acronym}
          </h3>
          <p>{profile.association.statement}</p>
        </div>
        <div className="credential-membership" data-testid="ai-brasil-membership">
          <div className="credential-logo credential-logo-community relative">
            <Image
              src={profile.community.image}
              alt="Identidade visual da comunidade AI Brasil"
              fill
              className="object-contain"
              sizes="256px"
            />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-white">
            {profile.community.title}
          </h3>
          <p>{profile.community.statement}</p>
        </div>
      </div>
    </div>
  );
}
