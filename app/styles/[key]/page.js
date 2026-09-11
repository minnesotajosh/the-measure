import styles from '../../../data/styles.json';
import { SITE_URL, photoSrc, withBasePath } from '../../../lib/paths';
import { buildScrollImages, otherStylePicks } from '../../../lib/scroll-images';
import Masthead from '../../../components/shared/Masthead';
import SiteFooter from '../../../components/shared/SiteFooter';
import SideNav from '../../../components/style-page/SideNav';
import Section from '../../../components/style-page/Section';
import ScrollVisual from '../../../components/style-page/ScrollVisual';
import EssaySection from '../../../components/style-page/EssaySection';
import TrademarksSection from '../../../components/style-page/TrademarksSection';
import WardrobeSection from '../../../components/style-page/WardrobeSection';
import GuidanceSection from '../../../components/style-page/GuidanceSection';
import DressingSection from '../../../components/style-page/DressingSection';
import LifestyleSection from '../../../components/style-page/LifestyleSection';
import OtherStylesSection from '../../../components/style-page/OtherStylesSection';

function findStyle(key) {
  return styles.find((s) => s.key === key);
}

export function generateStaticParams() {
  return styles.map((s) => ({ key: s.key }));
}

export function generateMetadata({ params }) {
  const style = findStyle(params.key);
  if (!style) return {};
  const canonical = SITE_URL + '/styles/' + style.key + '/';
  const ogImage = SITE_URL + '/' + style.photo.url;
  return {
    title: style.name + ' — Full Style Profile | The Measure',
    description: style.dek,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      title: style.name + ' — The Measure',
      description: style.dek,
      images: [ogImage],
      url: canonical,
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default function StylePage({ params }) {
  const style = findStyle(params.key);
  if (!style) return null;

  const picks = otherStylePicks(style, styles);
  const scrollImages = buildScrollImages(style);

  return (
    <>
      <ScrollVisual images={scrollImages} />
      <SideNav hasGuidance={Boolean(style.guidance)} />
      <Masthead brandHref="/" rightHref="/styles" rightLabel="All Styles" />
      <div className="reading-col">
        <div className="hero-title">
          <div className="r-eyebrow eyebrow">A Style Profile</div>
          <h1 className="r-name">{style.name}</h1>
          <div className="r-dek">{style.dek}</div>
        </div>

        <Section id="sec-essay" dataBg="photo">
          <EssaySection style={style} />
        </Section>

        <Section id="sec-trademarks" dataBg="item-0" title="Trademark Features">
          <TrademarksSection style={style} />
        </Section>

        <Section
          id="sec-wardrobe"
          dataBg="flatlay"
          title="The Wardrobe"
          note="The capsule flat-laid, the brands behind it, and five pieces that define the style — each with a low, mid, and high budget entry point."
        >
          <WardrobeSection style={style} />
        </Section>

        {style.guidance ? (
          <Section
            id="sec-guidance"
            dataBg="item-1"
            title="Do's and Don'ts"
            note="Every style has a right context and a wrong one, and one similar-looking garment easily mistaken for another."
          >
            <GuidanceSection style={style} />
          </Section>
        ) : null}

        <Section
          id="sec-dressing"
          dataBg="item-2"
          title="Dressing For It"
          note="The same wardrobe, adjusted for what the day actually throws at it."
        >
          <DressingSection style={style} />
        </Section>

        <Section
          id="sec-lifestyle"
          dataBg="travel"
          title="Beyond the Closet"
          note="A personal style was never just the clothes."
        >
          <LifestyleSection style={style} />
        </Section>

        <Section dataBg="item-4" title="Other Styles" last>
          <OtherStylesSection picks={picks} />
        </Section>
      </div>
      <SiteFooter variant="style" />
    </>
  );
}
