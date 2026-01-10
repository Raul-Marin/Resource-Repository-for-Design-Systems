import { useState } from 'react';
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface Tool {
  name: string;
  category: string;
  description: string;
  url: string;
  isPaid: boolean;
  domain: string;
  price: string;
  isAuthorPick?: boolean;
  authorNote?: string;
}

const toolsData: Tool[] = [
  // AI Builders & Code Generation
  {
    name: "v0",
    category: "AI Builders & Code Generation",
    description: "Vercel's AI-powered UI generator. Create components from text prompts with shadcn/ui.",
    url: "https://v0.dev",
    domain: "v0.dev",
    isPaid: true,
    price: "~€0–30/mo"
  },
  {
    name: "Lovable",
    category: "AI Builders & Code Generation",
    description: "Build full-stack web apps from natural language. AI-powered development platform.",
    url: "https://lovable.dev",
    domain: "lovable.dev",
    isPaid: true,
    price: "+€50/mo"
  },
  {
    name: "Bolt",
    category: "AI Builders & Code Generation",
    description: "StackBlitz's AI assistant for instant full-stack web development in the browser.",
    url: "https://bolt.new",
    domain: "bolt.new",
    isPaid: true,
    price: "~€0–30/mo"
  },
  {
    name: "Replit",
    category: "AI Builders & Code Generation",
    description: "Build software collaboratively with AI-powered code generation and deployment.",
    url: "https://replit.com",
    domain: "replit.com",
    isPaid: true,
    price: "~€0–35/mo"
  },
  {
    name: "Figr",
    category: "AI Builders & Code Generation",
    description: "AI-powered design to code platform for rapid prototyping and development.",
    url: "https://figr.design",
    domain: "figr.design",
    isPaid: true,
    price: "~€0–20/mo"
  },
  {
    name: "Figma Make",
    category: "AI Builders & Code Generation",
    description: "Figma's AI-powered web application builder. Turn designs into functional apps instantly.",
    url: "https://www.figma.com/make",
    domain: "figma.com",
    isPaid: true,
    price: "free / ~€12–45/mo"
  },
  {
    name: "Prototyper",
    category: "AI Builders & Code Generation",
    description: "Generate interactive prototypes and UI code from text descriptions.",
    url: "https://www.prototyper.co",
    domain: "prototyper.co",
    isPaid: true,
    price: "+€50/mo"
  },
  {
    name: "Flowstep",
    category: "AI Builders & Code Generation",
    description: "AI-powered workflow automation and app building platform.",
    url: "https://flowstep.ai",
    domain: "flowstep.ai",
    isPaid: true,
    price: "contact"
  },
  {
    name: "Reweb",
    category: "AI Builders & Code Generation",
    description: "Build websites with AI assistance. Generate layouts and components instantly.",
    url: "https://reweb.so",
    domain: "reweb.so",
    isPaid: true,
    price: "~€0–30/mo"
  },
  {
    name: "Paraflow",
    category: "AI Builders & Code Generation",
    description: "AI-powered visual development platform for building web applications.",
    url: "https://paraflow.com",
    domain: "paraflow.com",
    isPaid: true,
    price: "~€0–25/mo"
  },
  {
    name: "Composer",
    category: "AI Builders & Code Generation",
    description: "Visual AI workflow builder. Create multi-model pipelines by connecting nodes on a canvas.",
    url: "https://www.composer.design",
    domain: "composer.design",
    isPaid: true,
    price: "beta"
  },
  {
    name: "Orchids",
    category: "AI Builders & Code Generation",
    description: "Transform Figma designs into production-ready code with AI precision.",
    url: "https://www.orchids.app",
    domain: "orchids.app",
    isPaid: true,
    price: "~€30–50/mo"
  },
  // Design Systems Management
  {
    name: "Omlet",
    category: "Design Systems Management",
    description: "Track design system adoption across projects and identify improvement opportunities.",
    url: "https://www.omlet.dev",
    domain: "omlet.dev",
    isPaid: true,
    price: "+€50/mo"
  },
  {
    name: "Lyse",
    category: "Design Systems Management",
    description: "Automated design system documentation and component library management.",
    url: "https://www.getlyse.com",
    domain: "getlyse.com",
    isPaid: true,
    price: "+€50/mo"
  },
  {
    name: "Knapsack",
    category: "Design Systems Management",
    description: "Centralized platform for design system documentation, governance and collaboration.",
    url: "https://www.knapsack.cloud",
    domain: "knapsack.cloud",
    isPaid: true,
    price: "+€50/mo"
  },
  {
    name: "Paper",
    category: "Design Systems Management",
    description: "Design system workspace for teams to collaborate and maintain consistency.",
    url: "https://paper.design",
    domain: "paper.design",
    isPaid: true,
    price: "free / ~€0–20/mo"
  },
  {
    name: "Figma MCP Server",
    category: "Design Systems Management",
    description: "Model Context Protocol server for Figma. Connect AI assistants to your design files.",
    url: "https://www.figma.com/es-es/mcp-catalog/",
    domain: "figma.com",
    isPaid: false,
    price: "free"
  },
  {
    name: "Sketch MCP Server",
    category: "Design Systems Management",
    description: "Model Context Protocol server for Sketch. Integrate AI workflows with Sketch designs.",
    url: "https://www.sketch.com/docs/mcp-server/",
    domain: "sketch.com",
    isPaid: false,
    price: "free"
  },
  {
    name: "Penpot MCP Server",
    category: "Design Systems Management",
    description: "Model Context Protocol server for Penpot. Connect AI tools to open-source design platform.",
    url: "https://github.com/penpot/penpot-mcp",
    domain: "github.com",
    isPaid: false,
    price: "free"
  },
  {
    name: "Composio",
    category: "Design Systems Management",
    description: "Integration platform for AI agents. Connect design tools and automate workflows.",
    url: "https://composio.dev",
    domain: "composio.dev",
    isPaid: true,
    price: "free / ~€0–40/mo"
  },
  {
    name: "Storybook MCP Addon",
    category: "Design Systems Management",
    description: "Model Context Protocol addon for Storybook to enhance component documentation.",
    url: "https://storybook.js.org/addons/@storybook/addon-mcp",
    domain: "storybook.js.org",
    isPaid: false,
    price: "free"
  },
  {
    name: "Infa",
    category: "Design Systems Management",
    description: "New way of conducting Design System inventory and visualizing Design Systems in use.",
    url: "https://infa.ai/",
    domain: "infa.ai",
    isPaid: true,
    price: "~€0–80/mo"
  },
  {
    name: "UI UX Pro Max",
    category: "Design Systems Management",
    description: "Searchable database of UI styles, color palettes, font pairings, chart types, and UX guidelines. Build beautiful interfaces with AI-powered design recommendations.",
    url: "https://ui-ux-pro-max-skill.nextlevelbuilder.io/",
    domain: "nextlevelbuilder.io",
    isPaid: false,
    price: "free",
    isAuthorPick: true,
    authorNote: "This is a hidden gem! A comprehensive searchable database that covers everything from color theory to chart types. Perfect for making informed design decisions quickly."
  },
  // Design to Code
  {
    name: "Plasmic",
    category: "Design to Code",
    description: "Visual builder that generates clean code. Design and develop simultaneously.",
    url: "https://www.plasmic.app",
    domain: "plasmic.app",
    isPaid: true,
    price: "free / ~€20–30/mo"
  },
  {
    name: "Builder.io",
    category: "Design to Code",
    description: "Visual development platform. Convert designs to code with drag-and-drop builder.",
    url: "https://www.builder.io/",
    domain: "builder.io",
    isPaid: true,
    price: "free / ~€0–25/mo"
  },
  {
    name: "Anima",
    category: "Design to Code",
    description: "Convert Figma, Adobe XD and Sketch designs to React, Vue, HTML code automatically.",
    url: "https://www.animaapp.com/",
    domain: "animaapp.com",
    isPaid: true,
    price: "free / ~€0–40/mo"
  },
  {
    name: "Locofy",
    category: "Design to Code",
    description: "Ship products faster by converting designs to production-ready frontend code.",
    url: "https://www.locofy.ai/",
    domain: "locofy.ai",
    isPaid: true,
    price: "pay as you go"
  },
  {
    name: "Stitch",
    category: "Design to Code",
    description: "Google's AI-powered tool that converts designs to production-ready code with design systems integration.",
    url: "https://stitch.withgoogle.com/",
    domain: "withgoogle.com",
    isPaid: false,
    price: "free"
  },
  {
    name: "Relume",
    category: "Design to Code",
    description: "AI-powered website builder and design system. Generate sitemaps and wireframes instantly from text prompts.",
    url: "https://www.relume.io/",
    domain: "relume.io",
    isPaid: true,
    price: "free / ~€0–40/mo"
  },
  // Design Generation & AI Tools
  {
    name: "Figma",
    category: "Design Generation & AI Tools",
    description: "Collaborative design platform with AI-powered features for design and prototyping.",
    url: "https://www.figma.com",
    domain: "figma.com",
    isPaid: true,
    price: "free / ~€12–45/mo"
  },
  {
    name: "Microsoft Designer",
    category: "Design Generation & AI Tools",
    description: "Microsoft's AI-powered graphic design tool for creating stunning visuals.",
    url: "https://designer.microsoft.com",
    domain: "microsoft.com",
    isPaid: true,
    price: "free / ~€0–10/mo"
  },
  {
    name: "Uizard Autodesigner",
    category: "Design Generation & AI Tools",
    description: "Generate multi-screen mockups instantly from text prompts with AI.",
    url: "https://uizard.io/autodesigner/",
    domain: "uizard.io",
    isPaid: true,
    price: "~€30–40/mo"
  },
  {
    name: "UX Pilot",
    category: "Design Generation & AI Tools",
    description: "AI assistant for UX design workflows, research and prototyping.",
    url: "https://uxpilot.ai",
    domain: "uxpilot.ai",
    isPaid: true,
    price: "~€0–30/mo"
  },
  {
    name: "Studio Designer",
    category: "Design Generation & AI Tools",
    description: "AI-powered design studio for creating professional visual content.",
    url: "https://studio.design",
    domain: "studio.design",
    isPaid: true,
    price: "free / ~€0–20/mo"
  },
  {
    name: "Designify",
    category: "Design Generation & AI Tools",
    description: "AI-powered background removal and image enhancement for designs.",
    url: "https://designify.com",
    domain: "designify.com",
    isPaid: true,
    price: "free / ~€20–40/mo"
  },
  {
    name: "Home Designs AI",
    category: "Design Generation & AI Tools",
    description: "AI-powered interior and exterior design generation tool.",
    url: "https://homedesigns.ai",
    domain: "homedesigns.ai",
    isPaid: true,
    price: "+€50/mo"
  },
  {
    name: "Refire Design",
    category: "Design Generation & AI Tools",
    description: "AI design assistant for creating and iterating visual content rapidly.",
    url: "https://refiredesign.com",
    domain: "refiredesign.com",
    isPaid: true,
    price: "contact"
  },
  {
    name: "Wonder",
    category: "Design Generation & AI Tools",
    description: "AI-powered creative workspace for visual content and design exploration.",
    url: "https://wonder.so",
    domain: "wonder.so",
    isPaid: true,
    price: "contact"
  },
  {
    name: "MagicPath",
    category: "Design Generation & AI Tools",
    description: "AI-powered platform for building interactive user journeys and product tours.",
    url: "https://magicpath.ai",
    domain: "magicpath.ai",
    isPaid: true,
    price: "free / ~€0–30/mo"
  },
  // Documentation
  {
    name: "Mintlify",
    category: "Documentation",
    description: "Beautiful documentation that converts users. AI-powered docs platform.",
    url: "https://www.mintlify.com",
    domain: "mintlify.com",
    isPaid: true,
    price: "+€50/mo"
  },
  {
    name: "zeroheight",
    category: "Documentation",
    description: "Design system documentation platform. Connect Figma and Storybook for living docs.",
    url: "https://zeroheight.com",
    domain: "zeroheight.com",
    isPaid: true,
    price: "~€0–49/mo"
  },
  {
    name: "Supernova",
    category: "Documentation",
    description: "Complete design system platform with documentation, code generation and collaboration.",
    url: "https://www.supernova.io",
    domain: "supernova.io",
    isPaid: true,
    price: "~€0–35/mo"
  },
  {
    name: "Docusaurus",
    category: "Documentation",
    description: "Open-source documentation framework powered by React. Easy to maintain and deploy.",
    url: "https://docusaurus.io/",
    domain: "docusaurus.io",
    isPaid: false,
    price: "free"
  },
  {
    name: "GitBook",
    category: "Documentation",
    description: "Modern documentation platform for technical teams. Beautiful docs with Git integration.",
    url: "https://www.gitbook.com/",
    domain: "gitbook.com",
    isPaid: true,
    price: "free / ~€0–65/mo"
  },
  {
    name: "Figmayo",
    category: "Documentation",
    description: "Transform Figma designs into interactive documentation and design system specs.",
    url: "https://www.figmayo.com/",
    domain: "figmayo.com",
    isPaid: true,
    price: "~€30/mo"
  },
  // Other Tools
  {
    name: "Khroma",
    category: "Other Tools",
    description: "AI-powered color palette generator. Discover, search, and save color combinations personalized to your preferences.",
    url: "https://www.khroma.co/",
    domain: "khroma.co",
    isPaid: false,
    price: "free"
  }
];

export function MigrateTools() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [totalMigrated, setTotalMigrated] = useState(0);

  const runMigration = async () => {
    setIsRunning(true);
    setResults([]);
    setError(null);
    setSuccess(false);
    setTotalMigrated(0);

    const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9f3e46c1/cms/tools`;

    try {
      setResults(prev => [...prev, `🚀 Starting migration of ${toolsData.length} tools...`]);
      setResults(prev => [...prev, `📡 API URL: ${API_URL}`]);
      setResults(prev => [...prev, ``]);

      let migrated = 0;
      for (const tool of toolsData) {
        try {
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(tool)
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
          }

          migrated++;
          setTotalMigrated(migrated);
          setResults(prev => [...prev, `✅ [${migrated}/${toolsData.length}] ${tool.name} (${tool.category})`]);
        } catch (err) {
          const errorMsg = err instanceof Error ? err.message : 'Unknown error';
          setResults(prev => [...prev, `❌ Failed: ${tool.name} - ${errorMsg}`]);
        }
      }

      setSuccess(true);
      setResults(prev => [...prev, ``]);
      setResults(prev => [...prev, `✨ Migration completed! ${migrated} of ${toolsData.length} tools migrated.`]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="cms-page min-h-screen bg-[#f0ede8] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg">
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
            Tools Migration
          </h1>
          <p className="text-gray-600 mb-8" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
            Migrate {toolsData.length} tools to the CMS database
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900 mb-1">Migration Error</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900 mb-1">Migration Successful!</p>
                <p className="text-sm text-green-700">All tools have been migrated to the CMS.</p>
              </div>
            </div>
          )}

          <button
            onClick={runMigration}
            disabled={isRunning}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 mb-6"
            style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
          >
            {isRunning ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Migrating...
              </>
            ) : (
              <>
                <ArrowRight className="w-5 h-5" />
                Start Migration
              </>
            )}
          </button>

          {results.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h3 className="font-semibold mb-3 text-gray-900" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
                Migration Log
              </h3>
              <div className="space-y-1 max-h-96 overflow-y-auto font-mono text-xs text-gray-700">
                {results.map((result, index) => (
                  <div key={index} className="whitespace-pre-wrap">
                    {result}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <a
              href="/admin"
              className="text-blue-600 hover:underline text-sm"
              style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
            >
              ← Back to Admin
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}