import { useState } from "react";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";

// Este componente es para migrar los readings hardcodeados al CMS
// Solo necesitas usarlo una vez, luego puedes eliminarlo

const ADMIN_PASSWORD = "designsystems2024";
const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9f3e46c1/cms`;

// Los readings hardcodeados que queremos migrar
const readingsToMigrate = [
  {
    title: "Where should AI sit in your UI?",
    author: "Yoav Lavi",
    source: "UX Collective",
    type: "Article",
    description: "Exploring strategic placement and integration of AI features within user interfaces for optimal user experience.",
    url: "https://uxdesign.cc/where-should-ai-sit-in-your-ui-1710a258390e",
    tags: ["AI", "UI Design", "UX"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
  {
    title: "Announcing the Carbon AI Chat v1 release",
    author: "IBM Carbon",
    source: "Medium",
    type: "Article",
    description: "IBM Carbon Design System announces their AI chat component and patterns for integrating conversational AI.",
    url: "https://medium.com/carbondesign/announcing-the-carbon-ai-chat-v1-release-ce5f5b2fbab3",
    tags: ["IBM Carbon", "AI Chat", "Components"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
  },
  {
    title: "Vibe coding and beyond",
    author: "Red Hat PatternFly",
    source: "Medium",
    type: "Article",
    description: "Exploring vibe coding and the future of design systems at Red Hat with AI-powered workflows.",
    url: "https://medium.com/patternfly/vibe-coding-and-beyond-b4bc80b7a74f",
    tags: ["Red Hat", "Vibe Coding", "AI"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  },
  {
    title: "People + AI Guidebook",
    author: "Google PAIR",
    source: "Google",
    type: "Guide",
    description: "Google's comprehensive guide to designing human-centered AI experiences and products.",
    url: "https://pair.withgoogle.com/guidebook/",
    tags: ["Google", "AI Guidelines", "UX"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    title: "The new Microsoft 365 Copilot mobile experience",
    author: "Microsoft Design",
    source: "Microsoft",
    type: "Article",
    description: "Microsoft's approach to designing AI-powered mobile experiences with Copilot integration.",
    url: "https://microsoft.design/articles/the-new-microsoft-365-copilot-mobile-experience/",
    tags: ["Microsoft", "Copilot", "Mobile"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
  },
  {
    title: "Your next design system user is an agent",
    author: "Murphy Trueman",
    source: "Blog",
    type: "Article",
    description: "Exploring how AI agents will become primary consumers of design systems and what that means for the future.",
    url: "https://blog.murphytrueman.com/p/your-next-design-system-user",
    tags: ["AI Agents", "Future", "Design Systems"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
  {
    title: "Responsible AI practices",
    author: "Google AI",
    source: "Google",
    type: "Guide",
    description: "Google's framework for building responsible AI systems with ethical considerations and best practices.",
    url: "https://ai.google.dev/responsible",
    tags: ["Google", "Responsible AI", "Ethics"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
  },
  {
    title: "My 2026 predictions for designers and Design Systems",
    author: "Design System Diaries",
    source: "Substack",
    type: "Article",
    description: "Predictions and insights for the future of design and design systems in the age of AI.",
    url: "https://designsystemdiaries.com/p/my-2026-predictions-for-designers-and-design-systems",
    tags: ["Predictions", "Future", "AI"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
  },
  {
    title: "Exploring generative AI UX patterns: defining the rules of interaction",
    author: "Applied Innovation Exchange",
    source: "Medium",
    type: "Article",
    description: "A comprehensive exploration of UX patterns emerging from generative AI interactions and how to define clear rules for AI-human interaction design.",
    url: "https://blog.appliedinnovationexchange.com/exploring-generative-ai-ux-patterns-defining-the-rules-of-interaction-a6d5aeb80d3b",
    tags: ["AI Patterns", "UX", "Generative AI"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
  {
    title: "AI & Design Systems",
    author: "Southleft",
    source: "Blog",
    type: "Article",
    description: "Exploring the intersection of artificial intelligence and design system methodologies.",
    url: "https://southleft.com/ai-design-systems/",
    tags: ["AI", "Design Systems", "Strategy"],
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
  },
  {
    title: "When Design Systems learn",
    author: "Music for Interfaces",
    source: "Medium",
    type: "Article",
    description: "A reflection on the future of design systems when they incorporate machine learning capabilities.",
    url: "https://medium.com/music-for-interfaces/cuando-los-design-systems-aprendan-3e3cb8d87034",
    tags: ["Machine Learning", "Future", "Design Systems"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
  },
  {
    title: "Is the web dying?",
    author: "Amaya Eguizabal",
    source: "Medium",
    type: "Article",
    description: "Critical analysis of the current state and future of the web in the age of artificial intelligence.",
    url: "https://medium.com/@amayaeguizabal/la-web-est%C3%A1-muriendo-cf47ae81268c",
    tags: ["Web", "AI Impact", "Future"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  },
  {
    title: "When the output becomes the material",
    author: "Yesenia Perez-Cruz",
    source: "Substack",
    type: "Article",
    description: "Reflections on how AI-generated content is becoming the raw material for design and creative work.",
    url: "https://yeseniaperezcruz.substack.com/p/when-the-output-becomes-the-material",
    tags: ["AI Output", "Creative Process", "Design"],
    image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&q=80",
  },
  {
    title: "Thoughts on AI and Design",
    author: "Cristian Morales",
    source: "giorris.dev",
    type: "Article",
    description: "Personal perspectives and insights on the impact of AI on design practice and systems.",
    url: "https://www.giorris.dev/thoughts",
    tags: ["AI", "Design", "Thoughts"],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
  },
  {
    title: "Design Systems, AI, and MCP",
    author: "Figma",
    source: "Figma Blog",
    type: "Article",
    description: "Figma's vision for integrating AI and Model Context Protocol into design system workflows.",
    url: "https://www.figma.com/blog/design-systems-ai-mcp/",
    tags: ["Figma", "MCP", "AI Integration"],
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
  },
  {
    title: "AI-powered prototyping with Design Systems",
    author: "Vercel",
    source: "Vercel Blog",
    type: "Article",
    description: "How Vercel leverages AI to accelerate prototyping workflows using design system components.",
    url: "https://vercel.com/blog/ai-powered-prototyping-with-design-systems",
    tags: ["Vercel", "Prototyping", "AI"],
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
  },
  {
    title: "HAX Toolkit AI Guidelines",
    author: "Microsoft",
    source: "Microsoft",
    type: "Guide",
    description: "Microsoft's Human-AI eXperiences Toolkit with comprehensive guidelines for designing AI experiences.",
    url: "https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/",
    tags: ["Microsoft", "HAX", "Guidelines"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
  },
  {
    title: "Design System Repository",
    author: "Ruben Ferreira Duarte",
    source: "Notion",
    type: "Guide",
    description: "A curated repository of design system resources, tools, and best practices for modern teams.",
    url: "https://rubenferreiraduarte.notion.site/4d6689eec17a46bc84ecfedbd7c85220?v=0260afd5987042bf809d8229d6f7e34b",
    tags: ["Repository", "Resources", "Design Systems"],
    image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&q=80",
  },
  {
    title: "Music for Interfaces",
    author: "Music for Interfaces",
    source: "Medium",
    type: "Article",
    description: "Exploring the intersection of sound design, interfaces, and design systems for creating harmonious digital experiences.",
    url: "https://medium.com/music-for-interfaces/music-for-interfaces-3f661ea02863",
    tags: ["Sound Design", "Interface", "Design"],
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
  },
  {
    title: "Design Shapers",
    author: "Design Shapers Community",
    source: "designshapers.co",
    type: "Community",
    description: "DesignShapers is the largest Spanish-speaking community of AI + design.",
    url: "https://www.designshapers.co/",
    tags: ["Community", "Networking"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  },
  {
    title: "Design System Automation",
    author: "Builder.io",
    source: "Builder.io Blog",
    type: "Article",
    description: "How to leverage AI and automation to scale and maintain Design Systems more efficiently.",
    url: "https://www.builder.io/blog/design-system-ai-automation",
    tags: ["Design Systems", "Automation", "AI"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
  },
  {
    title: "Dear LLM, here's how my design system works",
    author: "UX Collective",
    source: "UX Collective",
    type: "Article",
    description: "A practical exploration of how to effectively communicate design system specifications and guidelines to Large Language Models for better AI-assisted design work.",
    url: "https://uxdesign.cc/dear-llm-heres-how-my-design-system-works-b59fb9a342b7",
    tags: ["LLM", "Design Systems", "AI", "Documentation"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
  {
    title: "How we document",
    author: "zeroheight",
    source: "zeroheight",
    type: "Article",
    description: "Exploring the best practices and tools for documenting design systems effectively.",
    url: "https://zeroheight.com/how-we-document/",
    tags: ["Documentation", "Design Systems", "Best Practices"],
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&q=80",
  },
  {
    title: "Design for the AI age",
    author: "Linear",
    source: "Linear",
    type: "Article",
    description: "Linear's perspective on designing products and interfaces in the age of artificial intelligence.",
    url: "https://linear.app/now/design-for-the-ai-age",
    tags: ["AI", "Design", "Product Design"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
  {
    title: "Vibe coding with Cursor for Design Systems: 10 learning lessons",
    author: "Diana Wolosin",
    source: "Design Bootcamp",
    type: "Article",
    description: "Practical lessons learned from experimenting with vibe coding using Cursor AI for Design System development and workflows.",
    url: "https://medium.com/design-bootcamp/vibe-coding-with-cursor-for-design-systems-10-learning-lessons-34d098d95474",
    tags: ["Vibe Coding", "Cursor", "Design Systems", "AI"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  }
];

export function MigrateReadings() {
  const [status, setStatus] = useState<string>("ready");
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLog(prev => [...prev, message]);
    console.log(message);
  };

  const migrateReadings = async () => {
    setStatus("migrating");
    setProgress(0);
    setLog([]);

    addLog("🚀 Iniciando migración de readings...");
    addLog(`📦 Total a migrar: ${readingsToMigrate.length} readings`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < readingsToMigrate.length; i++) {
      const reading = readingsToMigrate[i];
      try {
        addLog(`📝 [${i + 1}/${readingsToMigrate.length}] Migrando: "${reading.title}"...`);

        const response = await fetch(`${API_URL}/readings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${publicAnonKey}`,
            "X-Admin-Key": ADMIN_PASSWORD,
          },
          body: JSON.stringify(reading),
        });

        if (response.ok) {
          successCount++;
          addLog(`   ✅ Éxito: "${reading.title}"`);
        } else {
          const error = await response.text();
          errorCount++;
          addLog(`   ❌ Error: "${reading.title}" - ${error}`);
        }
      } catch (err) {
        errorCount++;
        addLog(`   ❌ Error: "${reading.title}" - ${err}`);
      }

      setProgress(((i + 1) / readingsToMigrate.length) * 100);

      // Pequeña pausa entre peticiones para no saturar
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    addLog("");
    addLog("✨ Migración completada!");
    addLog(`✅ Exitosos: ${successCount}`);
    addLog(`❌ Errores: ${errorCount}`);
    setStatus("completed");
  };

  return (
    <div className="min-h-screen bg-[var(--color-cloud-dancer)] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl border border-gray-200/50 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
            <h1 className="text-2xl font-semibold">Migrate Readings to CMS</h1>
            <p className="text-purple-100 mt-1">
              Migrar {readingsToMigrate.length} readings hardcodeados al CMS de Supabase
            </p>
          </div>

          <div className="p-6">
            {status === "ready" && (
              <div>
                <p className="text-gray-600 mb-6">
                  Este proceso migrará todos los readings hardcodeados al CMS. Las imágenes de Figma se reemplazarán
                  con imágenes de Unsplash relevantes. Este proceso solo necesitas ejecutarlo una vez.
                </p>
                <button
                  onClick={migrateReadings}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  🚀 Iniciar migración
                </button>
              </div>
            )}

            {status === "migrating" && (
              <div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progreso</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {status === "completed" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-medium">
                  ✨ Migración completada exitosamente!
                </p>
                <p className="text-green-600 text-sm mt-1">
                  Ahora puedes ir a /admin y ver todos los readings en el CMS.
                </p>
              </div>
            )}

            {/* Log */}
            {log.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium text-gray-900 mb-2">Log de migración:</h3>
                <div className="bg-gray-900 rounded-lg p-4 max-h-96 overflow-y-auto">
                  {log.map((line, i) => (
                    <div key={i} className="text-xs font-mono text-gray-300 mb-1">
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
