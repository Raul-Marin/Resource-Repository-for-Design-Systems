import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

type Section = "home" | "design-systems" | "tools" | "jobs" | "readings" | "changelog" | "about" | "contributors";

interface MachineViewProps {
  activeSection: Section;
}

interface Tool {
  name: string;
  category: string;
  description: string;
  url: string;
  isPaid: boolean;
  domain: string;
  price: string;
  iconUrl?: string;
  isAuthorPick?: boolean;
  authorNote?: string;
}

interface DesignSystem {
  id?: string;
  name: string;
  company: string;
  description?: string;
  url?: string; // Main website URL from CMS
  websiteUrl?: string; // Alternative field name
  figmaKit?: string; // Figma kit URL from CMS
  figmaKitUrl?: string; // Alternative field name
  documentation?: string; // Documentation URL from CMS
  additionalUrls?: { label: string; url: string }[]; // Additional links from CMS
  badge?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Job {
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  skills: string;
  applyUrl: string;
  postedDate: string;
}

interface Reading {
  title: string;
  author: string;
  source: string;
  description: string;
  url: string;
  type: string;
}

export function MachineView({ activeSection }: MachineViewProps) {
  const [copied, setCopied] = useState(false);
  const [tools, setTools] = useState<Tool[]>([]);
  const [designSystems, setDesignSystems] = useState<DesignSystem[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [readings, setReadings] = useState<Reading[]>([]);
  const [isLoadingTools, setIsLoadingTools] = useState(true);
  const [isLoadingDS, setIsLoadingDS] = useState(true);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [isLoadingReadings, setIsLoadingReadings] = useState(true);

  // Load tools from CMS
  useEffect(() => {
    const loadTools = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-9f3e46c1/cms/tools`,
          {
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          setTools(data);
        }
      } catch (err) {
        console.error("Error loading tools for MachineView:", err);
      } finally {
        setIsLoadingTools(false);
      }
    };

    loadTools();
  }, []);

  // Load design systems from CMS
  useEffect(() => {
    const loadDesignSystems = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-9f3e46c1/cms/design-systems`,
          {
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          setDesignSystems(data);
        }
      } catch (err) {
        console.error("Error loading design systems for MachineView:", err);
      } finally {
        setIsLoadingDS(false);
      }
    };

    loadDesignSystems();
  }, []);

  // Load jobs from CMS
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-9f3e46c1/cms/jobs`,
          {
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        }
      } catch (err) {
        console.error("Error loading jobs for MachineView:", err);
      } finally {
        setIsLoadingJobs(false);
      }
    };

    loadJobs();
  }, []);

  // Load readings from CMS
  useEffect(() => {
    const loadReadings = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-9f3e46c1/cms/readings`,
          {
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          setReadings(data);
        }
      } catch (err) {
        console.error("Error loading readings for MachineView:", err);
      } finally {
        setIsLoadingReadings(false);
      }
    };

    loadReadings();
  }, []);

  // Generate dynamic tools content from CMS data
  const generateToolsContent = (): string => {
    if (isLoadingTools) {
      return `# AI tools & resources

Loading tools from database...`;
    }

    if (tools.length === 0) {
      return `# AI tools & resources

No tools found in database.`;
    }

    // Group tools by category
    const categoryMap: Record<string, { title: string; tools: Tool[] }> = {
      'Builders': { title: 'AI Builders & Code Generation', tools: [] },
      'Management': { title: 'Design Systems Management', tools: [] },
      'Design to Code': { title: 'Design to Code', tools: [] },
      'Design Generation': { title: 'Design Generation & AI Tools', tools: [] },
      'Documentation': { title: 'Documentation', tools: [] },
      'Other': { title: 'Other Tools', tools: [] },
    };

    // Populate categories
    tools.forEach(tool => {
      const category = tool.category || 'Other';
      if (categoryMap[category]) {
        categoryMap[category].tools.push(tool);
      } else {
        categoryMap['Other'].tools.push(tool);
      }
    });

    // Generate markdown
    let content = `# AI tools & resources

Discover new tools and platforms that are revolutionizing design systems with AI

`;

    Object.values(categoryMap).forEach(({ title, tools }) => {
      if (tools.length > 0) {
        content += `## ${title}

`;
        
        tools.forEach(tool => {
          content += `### ${tool.name}
`;
          content += `${tool.description}
`;
          content += `[Website](${tool.url})
`;
          if (tool.price) {
            content += `Price: ${tool.price}
`;
          }
          if (tool.isAuthorPick && tool.authorNote) {
            content += `⭐ Author's pick: ${tool.authorNote}
`;
          }
          content += `
`;
        });
      }
    });

    return content;
  };

  // Generate dynamic design systems content from CMS data
  const generateDesignSystemsContent = (): string => {
    if (isLoadingDS) {
      return `# Design Systems

Loading design systems from database...`;
    }

    if (designSystems.length === 0) {
      return `# Design Systems

No design systems found in database.`;
    }

    let content = `# Design Systems

Official Design Systems implementing AI features and their Figma UI kits

## Featured Design Systems

`;

    designSystems.forEach(ds => {
      content += `### ${ds.name}`;
      if (ds.company) {
        content += ` (${ds.company})`;
      }
      content += `
`;
      
      // Only add description if it exists
      if (ds.description) {
        content += `${ds.description}
`;
      }
      
      // Only add official site link if URL exists
      if (ds.url || ds.websiteUrl) {
        content += `[Official Site](${ds.url || ds.websiteUrl})
`;
      }
      
      if (ds.figmaKit || ds.figmaKitUrl) {
        content += `[Figma UI Kit](${ds.figmaKit || ds.figmaKitUrl})
`;
      }
      
      if (ds.documentation) {
        content += `[Documentation](${ds.documentation})
`;
      }
      
      if (ds.additionalUrls && ds.additionalUrls.length > 0) {
        ds.additionalUrls.forEach(link => {
          if (link.label && link.url) {
            content += `[${link.label}](${link.url})
`;
          }
        });
      }
      
      if (ds.badge) {
        content += `Badge: ${ds.badge}
`;
      }
      
      content += `
`;
    });

    return content;
  };

  // Generate dynamic jobs content from CMS data
  const generateJobsContent = (): string => {
    if (isLoadingJobs) {
      return `# Job opportunities

Loading jobs from database...`;
    }

    if (jobs.length === 0) {
      return `# Job opportunities

No jobs found in database.`;
    }

    let content = `# Job opportunities

Design Systems roles that require AI knowledge and experience

## Featured Positions

`;

    jobs.forEach(job => {
      content += `### ${job.title}
`;
      content += `Company: ${job.company}
`;
      content += `Location: ${job.location}
`;
      content += `Type: ${job.type}
`;
      if (job.postedDate) {
        content += `Posted: ${job.postedDate}
`;
      }
      content += `${job.description}
`;
      if (job.skills) {
        content += `Skills: ${job.skills}
`;
      }
      content += `[Apply](${job.applyUrl})
`;
      content += `
`;
    });

    content += `---

Note: Job listings are curated examples. Visit company career pages for current openings.`;

    return content;
  };

  // Generate dynamic readings content from CMS data
  const generateReadingsContent = (): string => {
    if (isLoadingReadings) {
      return `# Reading list

Loading readings from database...`;
    }

    if (readings.length === 0) {
      return `# Reading list

No readings found in database.`;
    }

    let content = `# Reading list

Articles, books, and resources about Design Systems and AI

## Essential Reading

`;

    readings.forEach(reading => {
      content += `### "${reading.title}"
`;
      if (reading.author) {
        content += `Author: ${reading.author}
`;
      }
      if (reading.source) {
        content += `Source: ${reading.source}
`;
      }
      content += `${reading.description}
`;
      content += `[Read Article](${reading.url})
`;
      content += `
`;
    });

    content += `---

Note: All readings curated for quality and relevance to Design Systems and AI.`;

    return content;
  };

  // Generate dynamic home content with real stats
  const generateHomeContent = (): string => {
    const dsCount = designSystems.length;
    const toolsCount = tools.length;
    const jobsCount = jobs.length;
    const readingsCount = readings.length;

    // Get featured items (first 6 of each)
    const featuredDS = designSystems.slice(0, 6).map(ds => ds.name).join(', ');
    const featuredTools = tools.slice(0, 6).map(t => t.name).join(', ');
    const featuredJobs = jobs.slice(0, 6).map(j => j.company).join(', ');

    return `# Design Systems for the AI Era

A human-curated collection of resources exploring how AI reshapes Design Systems

Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

## Quick stats

- ${dsCount}+ Design Systems
- ${toolsCount}+ AI tools  
- ${jobsCount} job openings
- ${readingsCount} essential readings

## What's inside

Explore our curated collection of AI Design System resources

### Design Systems with AI
Curated selection of official Design Systems implementing artificial intelligence features (reviewed 500+ systems)
→ ${dsCount}+ systems
${featuredDS ? `Featured: ${featuredDS}` : ''}

### AI tools & resources
Discover cutting-edge tools revolutionizing Design System workflows
→ ${toolsCount}+ tools
${featuredTools ? `Featured: ${featuredTools}` : ''}

### Job opportunities
Career opportunities in Design Systems with AI expertise
→ ${jobsCount} positions
${featuredJobs ? `Featured: ${featuredJobs}` : ''}

### Curated reading list
Articles, guides, and resources about AI in Design Systems
→ ${readingsCount} resources

## Sections

[Design Systems](#design-systems)
[Tools](#tools)
[Jobs](#jobs)
[Readings](#readings)
[Contributors](#contributors)
[Changelog](#changelog)
[About](#about)

---

shift + r lab - Design Systems & AI resources
Built with ♥ for the design community`;
  };

  const handleCopy = () => {
    let textToCopy = '';
    
    switch (activeSection) {
      case 'home':
        textToCopy = generateHomeContent();
        break;
      case 'tools':
        textToCopy = generateToolsContent();
        break;
      case 'design-systems':
        textToCopy = generateDesignSystemsContent();
        break;
      case 'jobs':
        textToCopy = generateJobsContent();
        break;
      case 'readings':
        textToCopy = generateReadingsContent();
        break;
      default:
        textToCopy = content[activeSection];
    }
    
    // Método fallback usando textarea para mayor compatibilidad
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    } finally {
      document.body.removeChild(textarea);
    }
  };

  const content: Record<Section, string> = {
    home: `# Design Systems for the AI Era

A human-curated collection of resources exploring how AI reshapes Design Systems

Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

## Quick stats

- 23+ Design Systems
- 47+ AI tools  
- 8 job openings
- 25 essential readings

## What's inside

Explore our curated collection of AI Design System resources

### Design Systems with AI
Curated selection of official Design Systems implementing artificial intelligence features (reviewed 500+ systems)
→ 19+ systems
Featured: Lightning DS, Cloudscape, Carbon, Ant Design X, Shadcn UI, Vibe DS

### AI tools & resources
Discover cutting-edge tools revolutionizing Design System workflows
→ 47+ tools
Featured: v0, Figma Make, Bolt, Lovable, Orchids, Anima

### Job opportunities
Career opportunities in Design Systems with AI expertise
→ 8 positions
Featured: DevRev, DataAnnotation, Craft, AlphaSense, Roche, Spotify

### Curated reading list
Articles, guides, and resources about AI in Design Systems
→ 25 resources
Featured: Google PAIR, IBM Carbon, Microsoft Design, UX Collective, PatternFly

## Sections

[Design Systems](#design-systems)
[Tools](#tools)
[Jobs](#jobs)
[Readings](#readings)
[Contributors](#contributors)
[Changelog](#changelog)
[About](#about)

---

shift + r lab - Design Systems & AI resources
Built with ♥ for the design community`,

    "design-systems": `# Design Systems

Official Design Systems implementing AI features and their Figma UI kits

## Featured Design Systems

### Lightning Design System (Salesforce)
Salesforce's design system with AI and agentic patterns
[Official Site](https://www.lightningdesignsystem.com/2e1ef8501/p/52a7c7-ai-and-slds-2)
[Figma UI Kit](https://www.figma.com/community/file/1478970084463860424/slds-2-pattern-agentic-experiences)
[Agentic Patterns](https://www.lightningdesignsystem.com/2e1ef8501/p/03c548-agentic-patterns)
[AI in Accessibility](https://www.salesforce.com/blog/design-ai-interfaces-accessibility/)
Badge: Recommended

### Fury Design System (Mercado Libre)
Mercado Libre's design system with AI in accessibility
[Official Site](https://medium.com/mercadolibre-tech/how-we-are-using-ai-in-mercado-libres-accessibility-team-e960b83283a9)
Badge: New

### Apps SDK UI (OpenAI)
OpenAI's design system for building apps in ChatGPT
[Official Site](https://developers.openai.com/apps-sdk)
[Figma UI Kit](https://www.figma.com/community/file/1560064615791108827/apps-in-chatgpt-components-templates)
[SDK Documentation](https://openai.github.io/apps-sdk-ui/?path=/docs/overview-introduction--docs)
[UI Guidelines](https://developers.openai.com/apps-sdk/concepts/ui-guidelines)
Badge: New

### Claude AI (unofficial)
Anthropic's unofficial design system by Geist
[Official Site](https://geist.co/work/anthropic)
[Figma UI Kit](https://www.figma.com/community/file/1445575023384366559)
Badge: New

### Cloudscape Design System (Amazon)
Amazon's design system with AI tools support
[Official Site](https://cloudscape.design/get-started/for-developers/ai-tools-support/)
[Figma UI Kit](https://www.figma.com/community/file/1585292872561164967/cds-component-library-2-0-3)

### Atlassian Design System
Atlassian's design system with Rovo AI experiences
[Official Site](https://atlassian.design/patterns/ai-rovo#rovo-brand-and-ai-experiences)
Badge: New

### Ethos Design System (GE HealthCare)
GE HealthCare's design system with AI guidelines
[Official Site](https://www.ethosdesignsystem.com/style-guides/artificial-intelligence)

### Pajamas Design System (GitLab)
GitLab's design system with AI-human interaction patterns
[Official Site](https://design.gitlab.com/patterns/ai-human-interaction)
[Duo Agents & Flows](https://design.gitlab.com/patterns/duo-agents-and-flows)

### Carbon Design System (IBM)
IBM's design system with comprehensive AI guidelines
[Official Site](https://carbondesignsystem.com/guidelines/carbon-for-ai/)
Badge: Featured

### Ant Design X
AI-focused design system for AI products
[Official Site](https://x.ant.design/)
[Figma UI Kit](https://www.figma.com/community/file/1501193060829090060/ant-design-x-community-design-system-for-ai-products)
Badge: New

### Vibe Design System (Monday)
Monday's design system with MCP support
[Official Site](https://vibe.monday.com/?path=/docs/mcp-new--docs)

### Blade Design System (Razorpay)
Razorpay's design system with MCP support
[Official Site](https://blade.razorpay.com/?path=/docs/guides-blade-mcp--docs)

### Patternfly Design System (Red Hat)
Red Hat's design system with AI principles and guidelines
[Official Site](https://www.patternfly.org/patternfly-ai/principles-and-guidelines)
Badge: Recommended

### Canvas Design System (Workday)
Workday's design system with AI experience guidelines
[Official Site](https://canvas.workday.com/guidelines/ai-guidance/ai-experience-guidelines)

### ActiveCampaign Design System
ActiveCampaign's design system with AI patterns
[Official Site](https://www.activecampaign.design/docs/patterns/ai)
Badge: New

### Horizon Design System (ServiceNow)
ServiceNow's design system with AI vision and guidelines
[Official Site](https://horizon.servicenow.com/getting-started/ai)
[AI Vision](https://horizon.servicenow.com/guidelines/ai/having-a-vision-for-ai)

### Seeds Design System (SproutSocial)
SproutSocial's design system with MCP server support
[Official Site](https://seeds.sproutsocial.com/components/mcp-server/)

### Soul Design System (Emplifi)
Emplifi's design system with AI guidelines
[Official Site](https://soul.emplifi.io/latest/patterns/patterns/ai-guidelines/patterns-oahsQIli)

### Backbase Design System
Backbase's design system with Cursor AI integration
[Official Site](https://designsystem.backbase.com/latest/guides/beta-ui-ang-with-cursor-f9fdjG0s)

### Shadcn UI
Beautiful components with MCP support
[Official Site](https://ui.shadcn.com/docs/mcp)
[Figma Kit](https://shadcnstudio.com/figma)
[MCP Documentation](https://shadcnstudio.com/mcp)

### Geist Design System (Vercel)
Vercel's design system for modern web applications
[Official Site](https://vercel.com/design)
Badge: Featured

### Content Design System (Intuit)
Intuit's content design system with AI guidelines
[Official Site](https://contentdesign.intuit.com/ai/)
Badge: New`,

    jobs: `# Job opportunities

Design Systems roles that require AI knowledge and experience

## Featured Positions

### Senior Design Systems Engineer
Company: DevRev
Location: Remote
Type: Full-time
Posted: 1 week ago
Build and evolve design system to empower product teams. Work on component libraries, design tokens, and developer experience.
Skills: Design Systems, React, TypeScript, Figma
[Apply](https://job-boards.greenhouse.io/devrev/jobs/5662226004)

### Design System Specialist
Company: DataAnnotation
Location: Remote
Type: Full-time
Posted: 1 day ago
Develop and maintain design system documentation and components. Collaborate with cross-functional teams.
Skills: Design Systems, Documentation, UI/UX, Collaboration
[Apply](https://www.linkedin.com/jobs/view/design-system-specialist-at-dataannotation-4338417624/)

### Director of Design (AI-First)
Company: Craft Worldwide
Location: Madrid, Spain
Type: Hybrid
Posted: 3 days ago
Lead visual direction with AI-first mindset. Build scalable design systems and integrate AI tools into creative workflows.
Skills: Design Systems, AI Tools, Design Leadership, Healthcare
[Apply](https://www.linkedin.com/jobs/search/?currentJobId=4346692606)

### Design System Engineer
Company: AlphaSense
Location: Remote
Type: Full-time
Posted: 2 weeks ago
Lead development and maintenance of design system. Create scalable UI components with designers and engineers.
Skills: Design Systems, Frontend, React, Component Libraries
[Apply](https://job-boards.greenhouse.io/alphasense/jobs/8237491002)

### Design System Engineer EDL
Company: EDL
Location: Copenhagen, Denmark
Type: On-site
Posted: 3 days ago
Build and maintain comprehensive component library and design guidelines for products.
Skills: Design Systems, CSS, JavaScript, Design Tokens
[Apply](https://www.linkedin.com/jobs/view/4348793843/)

### Expert iOS Design System Engineer
Company: Roche
Location: Remote
Type: Full-time
Posted: 1 week ago
Design and implement iOS design system components for healthcare applications. Ensure consistency across mobile platforms.
Skills: iOS, SwiftUI, Design Systems, Mobile
[Apply](https://careers.roche.com/global/en/job/ROCHGLOBAL202505111726EXTERNALENGLOBAL/)

### Design System Manager
Company: Lacoste
Location: Paris, France
Type: Full-time
Posted: 5 days ago
Lead strategy and execution of Lacoste's design system. Manage team and collaborate with stakeholders.
Skills: Design Systems, Leadership, Strategy, Cross-functional
[Apply](https://careers.lacoste.com/fr/annonce/4102035-design-system-manager-fm-75016-paris)

### Senior Visual Designer - Design Systems
Company: Spotify
Location: Stockholm, Sweden / Remote
Type: Full-time
Posted: 4 days ago
Build and maintain Spotify's design system components. Ensure design consistency across organization.
Skills: Design Systems, React, Web Components, Accessibility
[Apply](https://jobs.lever.co/spotify/f9da6d57-214f-4582-83db-c9609dbc5e4d)

---

Note: Job listings are curated examples. Visit company career pages for current openings.`,

    readings: `# Reading list

Articles, books, and resources about Design Systems and AI

## Essential Reading

### "Where should AI sit in your UI?"
Author: Yoav Lavi
Source: UX Collective
Exploring strategic placement and integration of AI features within user interfaces for optimal user experience.
[Read Article](https://uxdesign.cc/where-should-ai-sit-in-your-ui-1710a258390e)

### "Announcing the Carbon AI Chat v1 release"
Author: IBM Carbon
Source: Medium
IBM Carbon Design System announces their AI chat component and patterns for integrating conversational AI.
[Read Article](https://medium.com/carbondesign/announcing-the-carbon-ai-chat-v1-release-ce5f5b2fbab3)

### "Vibe coding and beyond"
Author: Red Hat PatternFly
Source: Medium
Exploring vibe coding and the future of design systems at Red Hat with AI-powered workflows.
[Read Article](https://medium.com/patternfly/vibe-coding-and-beyond-b4bc80b7a74f)

### "People + AI Guidebook"
Author: Google PAIR
Source: Google
Google's comprehensive guide to designing human-centered AI experiences and products.
[Read Article](https://pair.withgoogle.com/guidebook/)

### "The new Microsoft 365 Copilot mobile experience"
Author: Microsoft Design
Source: Microsoft
Microsoft's approach to designing AI-powered mobile experiences with Copilot integration.
[Read Article](https://microsoft.design/articles/the-new-microsoft-365-copilot-mobile-experience/)

### "Your next design system user is an agent"
Author: Murphy Trueman
Source: Blog
Exploring how AI agents will become primary consumers of design systems and what that means for the future.
[Read Article](https://blog.murphytrueman.com/p/your-next-design-system-user)

### "Responsible AI practices"
Author: Google AI
Source: Google
Google's framework for building responsible AI systems with ethical considerations and best practices.
[Read Article](https://ai.google.dev/responsible)

### "My 2026 predictions for designers and Design Systems"
Author: Design System Diaries
Source: Substack
Predictions and insights for the future of design and design systems in the age of AI.
[Read Article](https://designsystemdiaries.com/p/my-2026-predictions-for-designers-and-design-systems)

### "AI & Design Systems"
Author: Southleft
Source: Blog
Exploring the intersection of artificial intelligence and design system methodologies.
[Read Article](https://southleft.com/ai-design-systems/)

### "When Design Systems learn"
Author: Music for Interfaces
Source: Medium
A reflection on the future of design systems when they incorporate machine learning capabilities.
[Read Article](https://medium.com/music-for-interfaces/cuando-los-design-systems-aprendan-3e3cb8d87034)

### "Is the web dying?"
Author: Amaya Eguizabal
Source: Medium
Critical analysis of the current state and future of the web in the age of artificial intelligence.
[Read Article](https://medium.com/@amayaeguizabal/la-web-est%C3%A1-muriendo-cf47ae81268c)

### "When the output becomes the material"
Author: Yesenia Perez-Cruz
Source: Substack
Reflections on how AI-generated content is becoming the raw material for design and creative work.
[Read Article](https://yeseniaperezcruz.substack.com/p/when-the-output-becomes-the-material)

### "Thoughts on AI and Design"
Author: Cristian Morales
Source: giorris.dev
Personal perspectives and insights on the impact of AI on design practice and systems.
[Read Article](https://www.giorris.dev/thoughts)

### "Design Systems, AI, and MCP"
Author: Figma
Source: Figma Blog
Figma's vision for integrating AI and Model Context Protocol into design system workflows.
[Read Article](https://www.figma.com/blog/design-systems-ai-mcp/)

### "AI-powered prototyping with Design Systems"
Author: Vercel
Source: Vercel Blog
How Vercel leverages AI to accelerate prototyping workflows using design system components.
[Read Article](https://vercel.com/blog/ai-powered-prototyping-with-design-systems)

### "HAX Toolkit AI Guidelines"
Author: Microsoft
Source: Microsoft
Microsoft's Human-AI eXperiences Toolkit with comprehensive guidelines for designing AI experiences.
[Read Article](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/)

### "Design System Repository"
Author: Ruben Ferreira Duarte
Source: Notion
A curated repository of design system resources, tools, and best practices for modern teams.
[Read Article](https://rubenferreiraduarte.notion.site/4d6689eec17a46bc84ecfedbd7c85220?v=0260afd5987042bf809d8229d6f7e34b)

### "Music for Interfaces"
Author: Music for Interfaces
Source: Medium
Exploring the intersection of sound design, interfaces, and design systems for creating harmonious digital experiences.
[Read Article](https://medium.com/music-for-interfaces/music-for-interfaces-3f661ea02863)

### "Design Shapers"
Author: Design Shapers Community
Source: designshapers.co
DesignShapers is the largest Spanish-speaking community of AI + design.
[Visit Community](https://www.designshapers.co/)

### "Exploring generative AI UX patterns: defining the rules of interaction"
Author: Applied Innovation Exchange
Source: Medium
A comprehensive exploration of UX patterns emerging from generative AI interactions and how to define clear rules for AI-human interaction design.
[Read Article](https://blog.appliedinnovationexchange.com/exploring-generative-ai-ux-patterns-defining-the-rules-of-interaction-a6d5aeb80d3b)

### "Design System Automation"
Author: Builder.io
Source: Builder.io Blog
How to leverage AI and automation to scale and maintain Design Systems more efficiently.
[Read Article](https://www.builder.io/blog/design-system-ai-automation)

### "Dear LLM, here's how my design system works"
Author: UX Collective
Source: UX Collective
A practical exploration of how to effectively communicate design system specifications and guidelines to Large Language Models for better AI-assisted design work.
[Read Article](https://uxdesign.cc/dear-llm-heres-how-my-design-system-works-b59fb9a342b7)

### "How we document"
Author: zeroheight
Source: zeroheight
Exploring the best practices and tools for documenting design systems effectively.
[Read Article](https://zeroheight.com/how-we-document/)

### "Design for the AI age"
Author: Linear
Source: Linear
Linear's perspective on designing products and interfaces in the age of artificial intelligence.
[Read Article](https://linear.app/now/design-for-the-ai-age)

### "Vibe coding with Cursor for Design Systems: 10 learning lessons"
Author: Diana Wolosin
Source: Design Bootcamp
Practical lessons learned from experimenting with vibe coding using Cursor AI for Design System development and workflows.
[Read Article](https://medium.com/design-bootcamp/vibe-coding-with-cursor-for-design-systems-10-learning-lessons-34d098d95474)

---

Note: All readings curated for quality and relevance to Design Systems and AI.`,

    changelog: `# Changelog

Version history and release notes

## 2.1.0 - January 6, 2026

Feature & content update

### Technical improvements
- Implemented unified LoadingState component with skeleton preview for all CMS sections
- Updated MachineView to load real-time data from CMS for all sections
- Dynamic markdown generation for Design Systems, Tools, Jobs, and Readings in Machine Mode
- Real-time statistics in Home section based on current database content

### Content additions - AI connectors
- Created new AI Connectors category in Tools section
- Added zeroheight MCP to AI Connectors (Model Context Protocol server for design systems documentation)
- Added Figma MCP Server to AI Connectors (Model Context Protocol server for Figma)
- Added Sketch MCP Server to AI Connectors (AI workflows integration with Sketch)
- Added Penpot MCP Server to AI Connectors (Open-source design platform AI connection)
- Added Storybook MCP Addon to AI Connectors (Component documentation enhancement)
- Added Cristian Morales' Figma Plugin to AI Connectors (Cursor AI integration for Figma)
- Added Cristian Morales' Cursor Skills to AI Connectors (Design System automation workflows)

## 2.0.0 - January 5, 2026

Major feature

### Technical improvements
- Built enterprise-grade CMS with hidden admin panel accessible via direct URL with password authentication
- Implemented full CRUD operations powered by Supabase KV Store with real-time data synchronization
- Created advanced pagination system with 10/20 records per page, Previous/Next navigation, and clickable page numbers
- Developed intelligent image upload system with Supabase Storage integration and automatic fallback handling
- Migrated all resource data from static arrays to dynamic database with seamless backwards compatibility

### Content additions
- Added Composio to Tools (Integration platform for AI agents)
- Added UI UX Pro Max to Tools (Design recommendations database)

## 1.0.0 "Elisa" - January 4, 2026

Major release

### Technical improvements
- Launched full production version with Supabase backend integration
- Live resource submission system with community contributions
- Contributors section with animated ball pool and pixel characters
- Custom sparkle iconography for all six main sections with AI branding
- Contributors promoted to main navigation with improved visibility
- Dev Mode padding hover effect on contribution cards
- Optimized modal forms with header/footer separation and mobile support

### Content additions
- Complete collection of 95+ curated resources across Design Systems (19+), Tools (45+), Jobs (9+), and Readings (23+)
- Added Vibe Design System (Monday) with MCP support
- Added Blade Design System (Razorpay) with MCP support
- Added Seeds Design System (SproutSocial) with MCP server

## 0.3.0 - January 3, 2026

Polish & refinements

- Updated footer with Figma Make icon and branding
- Removed changelog button from footer for cleaner layout
- Added animated counters to hero pills with smooth deceleration effect
- Refined AI Era gradient in hero with softer colors and reduced filters
- Expanded tools directory with AI-powered design utilities

## 0.2.0 - January 2, 2026

Improvements

- Added GitHub-style contribution activity grid to changelog
- Enhanced card 5 with animated contribution grid effect
- Improved visual consistency across all sections
- Optimized CSS variables architecture for better maintainability
- Implemented responsive breakpoints using design system tokens

## 0.1.0 - January 1, 2026

Initial setup

- Initial launch of AI Design Systems repository with minimalist Figma-style design
- Four main sections implemented: Design Systems, Tools, Jobs, and Readings
- Built with CSS variables for colors, spacing, borders, radius, and typography using Google Sans font
- Cloud Dancer background (#f0ede8) with decorative dot grid
- Fluid shader background with AI colors (blue, purple, pink)
- Sidebar navigation with dev mode controls
- React + TypeScript architecture with component-based structure
- Initial Design Systems collection: Ant Design, Carbon, Atlassian, Vercel`,

    about: `# README

A curated collection of Design Systems embracing AI. It might sound contradictory, but we believe the best way to honor craft is to ride the AI wave into the future.

Our mission is to explore and document how artificial intelligence is shaping the future of design systems, providing resources, tools, and insights for designers and developers working at the intersection of AI and design.

All resources have been 100% manually curated and hand-picked to ensure quality and relevance.

A living collection that evolves with emerging AI technologies and Design System practices, made with care for the design community.

This project is community-driven, designed as a space where people can grow, contribute, and showcase what they bring to the table. Share your resources by clicking "Suggest a resource" on the homepage.

## Status

Status: Active & growing
Updated: January 2026

## Inspirations & credits

This project is inspired by the design and experience of Claude (https://claude.ai) and Parallel (https://parallel.ai/).

Built with Figma Make (https://www.figma.com/make) and Supabase (https://supabase.com)

~400 iterations (~3,500+ AI credits) · 10 hours
Thanks to Figma for the extra over the limit ;)

Follow the creator:
- YouTube: https://www.youtube.com/@RaulMarin_Figma
- LinkedIn: https://www.linkedin.com/in/raulmarincalleja/

## Made by Shift+R Lab

A school specialized in Design Systems since 2021, teaching emerging technologies like MCPs, AI tools for designers, and cutting-edge design practices.

Next enrollment: Jan 9, 2026
50 spots only → https://www.shiftr.pro/`,

    contributors: `# Contributors

Amazing people who have contributed to building this resource.

## We're building something special

This section will showcase all the amazing contributors who help make this resource better. Stay tuned!

## What to expect

### Recognition
Every contributor will be featured with their name and contributions

### Stats
Track total contributions and see the community impact grow

### Appreciation
Show gratitude to everyone who helps improve this resource

## Community values

- Community driven
- Open source
- Built together

---

Want to be part of this? Click "Start contributing" on the contributors page to submit your suggestions and help grow this resource.`
  };

  return (
    <div className="relative border border-white p-6 rounded-lg">
      {/* Botón copiar en esquina superior derecha */}
      <button
        className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded transition-colors group"
        onClick={handleCopy}
        title={copied ? "Copied!" : "Copy to clipboard"}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" strokeWidth={2} />
        ) : (
          <Copy className="w-4 h-4 text-white/60 group-hover:text-white" strokeWidth={2} />
        )}
      </button>

      {/* Contenido markdown */}
      <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-white pr-12">
        {(() => {
          switch (activeSection) {
            case 'home':
              return generateHomeContent();
            case 'tools':
              return generateToolsContent();
            case 'design-systems':
              return generateDesignSystemsContent();
            case 'jobs':
              return generateJobsContent();
            case 'readings':
              return generateReadingsContent();
            default:
              return content[activeSection];
          }
        })()}
      </pre>
    </div>
  );
}