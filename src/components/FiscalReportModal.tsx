import { X, Download, BarChart, TrendingUp, PieChart, Target } from 'lucide-react';
import { Client } from '../types';
import { personalityProducts } from '../data/products';

interface FiscalReportModalProps {
  client: Client;
  onClose: () => void;
}

export default function FiscalReportModal({ client, onClose }: FiscalReportModalProps) {
  const product = personalityProducts[client.personality];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Fiscal Report Preview</h2>
              <div className="flex items-center justify-between gap-4">
                <p className="text-gray-600">For {client.name}</p>
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  <Download className="w-4 h-4" />
                  Download Personalised Report
                </button>
              </div>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg w-full">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{client.name}'s Personality</h3>
                    <p className="text-sm text-gray-600">{client.personality}</p>
                  </div>
                  <BarChart className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-700 font-medium text-lg mb-3">Strengths in Investments</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      {client.personality === 'Knight' && (
                        <>
                          <li>Decisive action-taker</li>
                          <li>Strong risk management</li>
                          <li>Clear financial goals</li>
                        </>
                      )}
                      {client.personality === 'Explorer' && (
                        <>
                          <li>Adaptable to market changes</li>
                          <li>Open to new opportunities</li>
                          <li>High growth potential</li>
                        </>
                      )}
                      {client.personality === 'Healer' && (
                        <>
                          <li>Long-term perspective</li>
                          <li>Balanced approach</li>
                          <li>Consistent saving habits</li>
                        </>
                      )}
                      {client.personality === 'Wizard' && (
                        <>
                          <li>Analytical decision-making</li>
                          <li>Strategic portfolio planning</li>
                          <li>Data-driven approach</li>
                        </>
                      )}
                    </ul>
                  </div>                  
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg w-full">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Areas for Improvement</h3>
                    <p className="text-sm text-gray-600">Risk Analysis & Mitigation Strategies</p>
                  </div>
                  <Target className="w-6 h-6 text-amber-600" />
                </div>
                <div className="space-y-4">
                  <ul className="space-y-3">
                      {client.personality === 'Knight' && (
                        <>
                          <li className="p-3 bg-amber-50 rounded-lg">
                            <p className="font-medium text-amber-900 mb-1">Long-term Impact Oversight</p>
                            <p className="text-amber-800">Aggressive trading could lead to 15-20% portfolio volatility during market corrections</p>
                          </li>
                          <li className="p-3 bg-amber-50 rounded-lg">
                            <p className="font-medium text-amber-900 mb-1">Over-trading Tendency</p>
                            <p className="text-amber-800">Transaction costs and timing mismatches could erode returns by 3-5% annually</p>
                          </li>
                          <li className="p-3 bg-amber-50 rounded-lg">
                            <p className="font-medium text-amber-900 mb-1">Market Cycle Impatience</p>
                            <p className="text-amber-800">Premature exit from positions during downturns could result in 25-30% opportunity loss</p>
                          </li>
                        </>
                      )}
                      {client.personality === 'Explorer' && (
                        <>
                          <li className="p-3 bg-amber-50 rounded-lg">
                            <p className="font-medium text-amber-900 mb-1">Overexposure Risk</p>
                            <p className="text-amber-800">High allocation to emerging trends could lead to 40% drawdown in bear markets</p>
                          </li>
                          <li className="p-3 bg-amber-50 rounded-lg">
                            <p className="font-medium text-amber-900 mb-1">Portfolio Concentration</p>
                            <p className="text-amber-800">Over-investment in single sectors risks 35% capital loss during industry-specific downturns</p>
                          </li>
                          <li className="p-3 bg-amber-50 rounded-lg">
                            <p className="font-medium text-amber-900 mb-1">Emotional Trading</p>
                            <p className="text-amber-800">FOMO-driven investments could result in 20-25% loss from chasing market peaks</p>
                          </li>
                        </>
                      )}
                      {client.personality === 'Healer' && (
                        <>
                          <li className="p-3 bg-amber-50 rounded-lg">
                            <p className="font-medium text-amber-900 mb-1">Conservative Bias</p>
                            <p className="text-amber-800">Excessive cash holdings could lead to 15-20% opportunity cost during bull markets</p>
                          </li>
                          <li className="p-3 bg-amber-50 rounded-lg">
                            <p className="font-medium text-amber-900 mb-1">Missed Opportunities</p>
                            <p className="text-amber-800">Delayed entry points could result in 25% reduced returns compared to market averages</p>
                          </li>
                          <li className="p-3 bg-amber-50 rounded-lg">
                            <p className="font-medium text-amber-900 mb-1">Decision Paralysis</p>
                            <p className="text-amber-800">Analysis paralysis during market corrections could lead to 30% paper losses becoming realized</p>
                          </li>
                        </>
                      )}
                      {client.personality === 'Wizard' && (
                        <>
                          <li className="p-3 bg-amber-50 rounded-lg">
                            <p className="font-medium text-amber-900 mb-1">Analysis Paralysis</p>
                            <p className="text-amber-800">Delayed execution could miss out on 20-25% early-mover advantages in emerging markets</p>
                          </li>
                          <li className="p-3 bg-amber-50 rounded-lg">
                            <p className="font-medium text-amber-900 mb-1">Strategy Complexity</p>
                            <p className="text-amber-800">Complex hedging could increase costs by 5-7% annually while reducing upside potential</p>
                          </li>
                          <li className="p-3 bg-amber-50 rounded-lg">
                            <p className="font-medium text-amber-900 mb-1">Perfectionist Tendencies</p>
                            <p className="text-amber-800">Waiting for perfect entry points could result in 30% missed opportunities in rapid recovery phases</p>
                          </li>
                        </>
                      )}
                    </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg w-full">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Current Financial Status</h3>
                    <p className="text-sm text-gray-600">Portfolio Overview</p>
                  </div>
                  <PieChart className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Equity</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fixed Income</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Alternative</span>
                    <span className="font-medium">20%</span>
                  </div>
                  <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                    <h4 className="font-medium text-amber-800 mb-2">Untapped Opportunities</h4>
                    {client.personality === 'Knight' && (
                      <p className="text-sm text-amber-700">Current portfolio lacks premium protection features that could maximize wealth preservation while maintaining aggressive growth.</p>
                    )}
                    {client.personality === 'Explorer' && (
                      <p className="text-sm text-amber-700">Portfolio could benefit from more flexible investment options that align with market opportunities while maintaining protection.</p>
                    )}
                    {client.personality === 'Healer' && (
                      <p className="text-sm text-amber-700">Existing strategy could be enhanced with stronger legacy planning features and guaranteed inheritance benefits.</p>
                    )}
                    {client.personality === 'Wizard' && (
                      <p className="text-sm text-amber-700">Current allocation lacks sophisticated market-linked instruments with downside protection mechanisms.</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-4">Key Recommendations</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-indigo-600 text-sm">1</span>
                    </div>
                    <p className="text-gray-700">Optimize wealth protection strategy with {product.name}</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-indigo-600 text-sm">2</span>
                    </div>
                    <p className="text-gray-700">Implement structured savings plan aligned with industry growth</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-indigo-600 text-sm">3</span>
                    </div>
                    <p className="text-gray-700">Review and adjust portfolio allocation quarterly</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">Potential Growth Projection</h3>
                  <p className="text-sm text-gray-600">With {product.name}</p>
                </div>
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-800 font-medium">5-Year Projection</span>
                  {client.personality === 'Knight' && <span className="text-green-800">180% - 220%</span>}
                  {client.personality === 'Explorer' && <span className="text-green-800">160% - 200%</span>}
                  {client.personality === 'Healer' && <span className="text-green-800">140% - 180%</span>}
                  {client.personality === 'Wizard' && <span className="text-green-800">170% - 210%</span>}
                </div>
                <div className="text-sm text-gray-600">
                  {client.personality === 'Knight' && 
                    "Aggressive growth potential through premium allocation and wealth accumulation features"}
                  {client.personality === 'Explorer' && 
                    "Dynamic growth through flexible investment options and market participation"}
                  {client.personality === 'Healer' && 
                    "Steady growth with guaranteed returns and legacy preservation"}
                  {client.personality === 'Wizard' && 
                    "Optimized growth through sophisticated market-linked strategies with protection"}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-lg border border-indigo-100 mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-6 h-6 text-indigo-600" />
                <h3 className="font-semibold text-lg">Recommended Solution</h3>
              </div>
              <h4 className="text-xl font-bold text-indigo-600 mb-2">{product.name}</h4>
              <p className="text-gray-700 mb-3">
                {product.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>Estimated Premium: {product.estimatedPremium}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}